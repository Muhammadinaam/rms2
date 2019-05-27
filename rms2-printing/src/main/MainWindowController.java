package main;

import helpers.FxmlHelper;
import helpers.FxmlHelperControllerInterface;
import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.paint.Paint;
import javafx.stage.Stage;

import java.util.ArrayList;
import java.util.List;

public class MainWindowController implements FxmlHelperControllerInterface {

    @FXML private Label lblRunningOrStopped;
    @FXML private Button btnStartStop;
    @FXML private Button btnSettings;
    @FXML private TextArea txaLog;
    @FXML private CheckBox ckbAutoScroll;
    @FXML private VBox vBox;
    private Thread printingThread;
    private List<String> log = new ArrayList<>();

    private boolean isPrintingStarted = true;

    @FXML
    private void initialize() {
        setControlsProperties();

        startPrintingThread();

    }

    private void startPrintingThread(){

        printingThread = new Thread(){
            @Override
            public void run() {
                System.out.println("Thread Started");
                super.run();

                while(true){

                    if(isPrintingStarted){
                        System.out.println("abc");
                        log.add("abc");
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
        String lblRunningOrStoppedText = isPrintingStarted ? "Printing Services is Running" : "Printing Services is Stopped";
        lblRunningOrStopped.setText(lblRunningOrStoppedText);
        Paint lblRunningOrStoppedColor = isPrintingStarted ? Color.GREEN  : Color.RED;
        lblRunningOrStopped.setTextFill(lblRunningOrStoppedColor);
    }

    @FXML
    private void btnSettingsClicked() throws Exception{

        FxmlHelper SettingsFxmlHelper = new FxmlHelper("/main/Settings.fxml");
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
    }
}
