package main;

import javafx.fxml.FXML;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;
import javax.print.*;
import java.util.prefs.BackingStoreException;
import java.util.prefs.Preferences;

public class SettingsController {

    @FXML ComboBox posPrinter;
    @FXML TextField kitchen1Name;
    @FXML TextField kitchen2Name;
    @FXML TextField kitchen3Name;
    @FXML TextField kitchen4Name;
    @FXML ComboBox kitchen1Printer;
    @FXML ComboBox kitchen2Printer;
    @FXML ComboBox kitchen3Printer;
    @FXML ComboBox kitchen4Printer;
    @FXML TextField posApiUrl;
    private PrintService[] printServices;

    @FXML
    private void initialize(){

        printServices = PrintServiceLookup.lookupPrintServices(null, null);
        System.out.println("Number of print services: " + printServices.length);

        for (PrintService printer : printServices)
        {
            System.out.println("Printer: " + printer.getName());
            posPrinter.getItems().add(printer.getName());
            kitchen1Printer.getItems().add(printer.getName());
            kitchen2Printer.getItems().add(printer.getName());
            kitchen3Printer.getItems().add(printer.getName());
            kitchen4Printer.getItems().add(printer.getName());
        }

        Preferences prefs = Preferences.userRoot();
        try {
            prefs.sync();
        } catch (BackingStoreException e) {
            e.printStackTrace();
        }

        posPrinter.getSelectionModel().select(prefs.get("posPrinter", null));
        kitchen1Name.setText(prefs.get("kitchen1Name", null));
        kitchen2Name.setText(prefs.get("kitchen2Name", null));
        kitchen3Name.setText(prefs.get("kitchen3Name", null));
        kitchen4Name.setText(prefs.get("kitchen4Name", null));
        kitchen1Printer.getSelectionModel().select(prefs.get("kitchen1Printer", null));
        kitchen2Printer.getSelectionModel().select(prefs.get("kitchen2Printer", null));
        kitchen3Printer.getSelectionModel().select(prefs.get("kitchen3Printer", null));
        kitchen4Printer.getSelectionModel().select(prefs.get("kitchen4Printer", null));
        posApiUrl.setText(prefs.get("posApiUrl", null));

    }

    @FXML
    private void btnSaveClicked(){
        Preferences prefs = Preferences.userRoot();

        if( posPrinter.getSelectionModel().getSelectedItem() != null )
            prefs.put("posPrinter", posPrinter.getSelectionModel().getSelectedItem().toString());

        if(kitchen1Name.getText() != null)
            prefs.put("kitchen1Name", kitchen1Name.getText());

        if(kitchen2Name.getText() != null)
            prefs.put("kitchen2Name", kitchen2Name.getText());

        if(kitchen3Name.getText() != null)
            prefs.put("kitchen3Name", kitchen3Name.getText());

        if(kitchen4Name.getText() != null)
            prefs.put("kitchen4Name", kitchen4Name.getText());


        if( kitchen1Printer.getSelectionModel().getSelectedItem() != null )
            prefs.put("kitchen1Printer", kitchen1Printer.getSelectionModel().getSelectedItem().toString());

        if( kitchen2Printer.getSelectionModel().getSelectedItem() != null )
            prefs.put("kitchen2Printer", kitchen2Printer.getSelectionModel().getSelectedItem().toString());

        if( kitchen3Printer.getSelectionModel().getSelectedItem() != null )
            prefs.put("kitchen3Printer", kitchen3Printer.getSelectionModel().getSelectedItem().toString());

        if( kitchen4Printer.getSelectionModel().getSelectedItem() != null )
            prefs.put("kitchen4Printer", kitchen4Printer.getSelectionModel().getSelectedItem().toString());


        prefs.put("posApiUrl", posApiUrl.getText());

        try {
            prefs.flush();
        } catch (BackingStoreException e) {
            e.printStackTrace();
        }
    }

}
