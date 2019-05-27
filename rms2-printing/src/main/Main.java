package main;

import helpers.FxmlHelper;
import javafx.application.Application;
import javafx.stage.Stage;

public class Main extends Application {

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage stage) throws Exception {

        FxmlHelper mainWindowHelper = new FxmlHelper("/main/MainWindow.fxml");
        mainWindowHelper.show("Printing System", null, null, false);
    }
}
