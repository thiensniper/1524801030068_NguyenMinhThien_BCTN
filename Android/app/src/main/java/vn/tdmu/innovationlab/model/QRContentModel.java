package vn.tdmu.innovationlab.model;

public class QRContentModel {
    public String idqr;
    public String nameqr;
    public String sel1;
    public String context;

    public QRContentModel() {
    }

    public QRContentModel(String idqr, String nameqr, String sel1, String context) {
        this.idqr = idqr;
        this.nameqr = nameqr;
        this.sel1 = sel1;
        this.context = context;
    }

    public String getIdqr() {
        return idqr;
    }

    public void setIdqr(String idqr) {
        this.idqr = idqr;
    }

    public String getNameqr() {
        return nameqr;
    }

    public void setNameqr(String nameqr) {
        this.nameqr = nameqr;
    }

    public String getSel1() {
        return sel1;
    }

    public void setSel1(String sel1) {
        this.sel1 = sel1;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }
}
