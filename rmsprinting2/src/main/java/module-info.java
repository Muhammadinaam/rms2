module inaam {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.prefs;
    requires java.desktop;
    requires unirest.java;
    requires json;

    opens main to javafx.fxml;
    exports main;
}