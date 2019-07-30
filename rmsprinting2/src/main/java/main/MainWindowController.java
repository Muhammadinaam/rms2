package main;

import Helpers.FxmlHelper;
import Helpers.FxmlHelperControllerInterface;
import Helpers.PrinterService;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.paint.Paint;
import com.mashape.unirest.http.Unirest;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.prefs.Preferences;

public class MainWindowController implements FxmlHelperControllerInterface {

    @FXML private Label lblRunningOrStopped;
    @FXML private Button btnStartStop;
    @FXML private Button btnSettings;
    @FXML private TextArea txaLog;
    @FXML private CheckBox ckbAutoScroll;
    @FXML private VBox vBox;
    private Thread printingThread;
    private List<String> log = new ArrayList<>();
    private String posApiUrl;
    private String restaurantName;
    PrinterService printerService;

    private boolean isPrintingStarted = true;

    @FXML
    private void initialize() {
        setControlsProperties();

        startPrintingThread();

        printerService = new PrinterService();

    }

    public void printOrders(){

        try {

            Preferences prefs = Preferences.userRoot();
            prefs.sync();
            posApiUrl = prefs.get("posApiUrl", null);

            if (posApiUrl == null || posApiUrl == "")
                return;

            HttpResponse<JsonNode> printJobsResponse = Unirest.get(posApiUrl + "/get-print-jobs").asJson();

            restaurantName = Unirest.get(posApiUrl + "/get-setting-by-idt?idt=restaurant-name").asString().getBody();

            JSONArray printJobs = printJobsResponse.getBody().getArray();

            for(int i = 0; i < printJobs.length(); i++){
                JSONObject printJob = printJobs.getJSONObject(i);
                executePrintJob(printJob);
            }

        }
        catch(Exception e){
            log.add("Error: " + e.getMessage());
        }



    }

    private void executePrintJob(JSONObject printJob) throws Exception {

        // execute print job
        String printType = printJob.getString("print_type");
        String orderId = printJob.getString("order_id");

        HttpResponse<JsonNode> orderResponse = Unirest.get(posApiUrl + "/orders/" + orderId).asJson();

        JSONObject order = orderResponse.getBody().getObject();

        Preferences prefs = Preferences.userRoot();
        prefs.sync();
        String posPrinter = prefs.get("posPrinter", null);



        //print some stuff
        String printText =

                        "                                           \n"
                        +"                                          \n"
                        +"******************************************\n"
                        + printerService.writeLineCenterAligned(restaurantName, 42) + "\n"
                        + "******************************************\n"
                        + "\n"
                        + "Print Type: " + printJob.getString("print_type") + "\n"
                        + "Order Number: " + order.getString("order_number") + "\n"
                        + printOrderInformation(order) + "\n"
                        + "\n"
                        + "__________________________________________\n"
                        + printerService.writeLineInColumn( "Item", 28 )
                        + printerService.writeLineInColumn( "Qty", 6 )
                        + printerService.writeLineInColumn( "Amount", 8 ) + "\n"
                        + "__________________________________________\n"
                        + printOrderItems(order) + "\n"
                        + printerService.writeLineInColumn( "SubTotal", 34 )
                        + printerService.writeLineInColumn( order.getString("order_amount_before_discount"), 8 ) + "\n"

                        + printerService.writeLineInColumn( "Discount", 34 )
                        + printerService.writeLineInColumn( order.getString("discount_amount"), 8 ) + "\n"

                        + printerService.writeLineInColumn( "Sales Tax", 34 )
                        + printerService.writeLineInColumn( order.getString("sales_tax_amount"), 8 ) + "\n"

                        + printerService.writeLineInColumn( "Net Amount", 34 )
                        + printerService.writeLineInColumn( order.getString("receivable_amount"), 8 ) + "\n"
                        + " \n"
                        + "Thanks for Visit. Please Come Again\n"
                        + " \n"
                        + " \n"
                        + " \n"
                        + " \n";

        printerService.printString(posPrinter, printText, false);


         //cut that paper!
        byte[] cutP = new byte[] { 0x1d, 'V', 1 };
        printerService.printBytes(posPrinter, cutP);


        // delete print job
        HttpResponse<JsonNode> deleteJobsResponse = Unirest.get(posApiUrl + "/delete-print-job/" + printJob.get("id").toString()).asJson();
        System.out.println(posApiUrl + "/delete-print-job/" + printJob.get("id").toString());
        System.out.println(deleteJobsResponse.getBody().toString());

        log.add( "Print Job sent to printer" );

    }

    private String printOrderItems(JSONObject order) {
        String itemsString = "";

        JSONArray items = order.getJSONArray("items");

        for(int i = 0; i < items.length(); i++){
            JSONObject item = items.getJSONObject(i);

            itemsString +=  printerService.writeLineInColumn( item.getString("name"), 28 )
                    + printerService.writeLineInColumn( item.get("quantity").toString(), 6 )
                    + printerService.writeLineInColumn( item.get("item_total_price").toString(), 8 ) + "\n";

            if(!item.get("instructions").toString().equals("null"))
            itemsString += "("+ item.get("instructions").toString() +")\n";

            JSONArray options = item.getJSONArray("options");

            for(int j = 0; j < options.length(); j++){
                  JSONObject option = options.getJSONObject(j);

                  JSONArray option_items = option.getJSONArray("options_items");

                  for(int k = 0; k < option_items.length(); k++){
                      JSONObject option_item = option_items.getJSONObject(k);
                      itemsString += "- " + option_item.getString("name") + "("+option_item.getString("price")+")\n";
                  }
            }

            itemsString += "- - - - - - - - - - - - - - - - - - - - - \n";


        }
        return itemsString;
    }

    private String printOrderInformation(JSONObject order) {
        String info = "";

        if(!order.get("customer_name").toString().equals("null"))
            info += "Customer Name: " + order.get("customer_name") + "\n";

        if(!order.get("customer_address").toString().equals("null"))
            info += "Customer Address: " + order.get("customer_address") + "\n";

        if(!order.get("customer_phone").toString().equals("null"))
            info += "Customer Phone: " + order.get("customer_phone") + "\n";

        if(!order.get("customer_zipcode").toString().equals("null"))
            info += "Customer ZipCode: " + order.get("customer_zipcode") + "\n";

        return info;
    }

    private void startPrintingThread(){

        printingThread = new Thread(){
            @Override
            public void run() {
                System.out.println("Thread Started");
                super.run();

                while(true){

                    if(isPrintingStarted){
                        printOrders();
                    }

                    Platform.runLater(() -> {
                        updateLogTextArea();
                    });

                    try {
                        Thread.sleep(2000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                        return;
                    }
                }
            }
        };

        printingThread.start();

    }

    private void updateLogTextArea() {
        if(log.size() > 100){
            log.remove(0);
        }

        StringBuilder logText = new StringBuilder();

        for ( String s: log) {
            logText.append(s + "\n\n");
        }

        if(ckbAutoScroll.isSelected()){
            txaLog.setText(logText.toString());
            txaLog.setScrollTop(Double.MAX_VALUE);
        }
        else
        {
            double scrollPosition = txaLog.getScrollTop();
            txaLog.setText(logText.toString());
            txaLog.setScrollTop(scrollPosition);
        }
    }

    private void setControlsProperties() {
        String btnStartStopText = isPrintingStarted ? "Stop" : "Start";
        btnStartStop.setText( btnStartStopText );
        btnSettings.setDisable( isPrintingStarted );
        String lblRunningOrStoppedText = isPrintingStarted ? "Printing Service is Running" : "Printing Service is Stopped";
        lblRunningOrStopped.setText(lblRunningOrStoppedText);
        Paint lblRunningOrStoppedColor = isPrintingStarted ? Color.GREEN  : Color.RED;
        lblRunningOrStopped.setTextFill(lblRunningOrStoppedColor);
    }

    @FXML
    private void btnSettingsClicked() throws Exception{

        FxmlHelper SettingsFxmlHelper = new FxmlHelper("/fxml/Settings.fxml");
        SettingsFxmlHelper.show("Settings", null, null, true);
    }

    @FXML
    private void btnStartStopClicked() throws Exception{

        System.out.println("abc");
        isPrintingStarted = !isPrintingStarted;
        setControlsProperties();
    }


    @Override
    public void windowClose() {
        printingThread.interrupt();
        try {
            Unirest.shutdown();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
