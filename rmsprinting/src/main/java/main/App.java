package main;

import Helpers.FxmlHelper;
import javafx.application.Application;
import javafx.stage.Stage;

import java.io.IOException;

/**
 * JavaFX App
 */
public class App extends Application {

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage stage) throws Exception {

        FxmlHelper mainWindowHelper = new FxmlHelper("/fxml/MainWindow.fxml");
        mainWindowHelper.show("Printing System", null, null, false);
    }

}