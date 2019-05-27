package helpers;

import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.layout.VBox;
import javafx.stage.Modality;
import javafx.stage.Stage;

public class FxmlHelper {

    private Parent root;
    private Object controller;

    public FxmlHelper(String fxmlFilePath) throws Exception {

        FXMLLoader fxmlLoader = new FXMLLoader();
        fxmlLoader.setLocation(getClass().getResource(fxmlFilePath));
        root = fxmlLoader.load();
        controller = fxmlLoader.getController();

    }

    public Parent getRoot() {
        return root;
    }

    public Object getController() {
        return controller;
    }

    public void show(String title, Integer width, Integer height, boolean isModal)
    {
        Stage stage = new Stage();
        stage.setTitle(title);

        stage.setOnCloseRequest(e -> {
            if(this.controller instanceof FxmlHelperControllerInterface){
                ((FxmlHelperControllerInterface) this.controller).windowClose();
            }
        });

        if(width != null && height != null){
            stage.setScene(new Scene(this.getRoot(), width, height));
        }
        else
        {
            stage.setScene(new Scene(this.getRoot()));
        }

        if(isModal){
            stage.initModality(Modality.APPLICATION_MODAL);
            stage.showAndWait();
        }
        else
        {
            stage.show();
        }
    }
}
