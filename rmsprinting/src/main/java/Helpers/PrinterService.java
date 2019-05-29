package Helpers;


import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.print.PageFormat;
import java.awt.print.Printable;
import java.awt.print.PrinterException;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.print.Doc;
import javax.print.DocFlavor;
import javax.print.DocPrintJob;
import javax.print.PrintService;
import javax.print.PrintServiceLookup;
import javax.print.SimpleDoc;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;

public class PrinterService implements Printable {

    public List<String> getPrinters(){

        DocFlavor flavor = DocFlavor.BYTE_ARRAY.AUTOSENSE;
        PrintRequestAttributeSet pras = new HashPrintRequestAttributeSet();

        PrintService printServices[] = PrintServiceLookup.lookupPrintServices(
                flavor, pras);

        List<String> printerList = new ArrayList<String>();
        for(PrintService printerService: printServices){
            printerList.add( printerService.getName());
        }

        return printerList;
    }

    @Override
    public int print(Graphics g, PageFormat pf, int page)
            throws PrinterException {
        if (page > 0) { /* We have only one page, and 'page' is zero-based */
            return NO_SUCH_PAGE;
        }

        /*
         * User (0,0) is typically outside the imageable area, so we must
         * translate by the X and Y values in the PageFormat to avoid clipping
         */
        Graphics2D g2d = (Graphics2D) g;
        g2d.translate(pf.getImageableX(), pf.getImageableY());
        /* Now we perform our rendering */

        g.setFont(new Font("Roman", 0, 4));
        g.drawString("Hello world !", 0, 10);

        return PAGE_EXISTS;
    }

    public void printString(String printerName, String text, boolean cutAfter) {

        // find the printService of name printerName
        DocFlavor flavor = DocFlavor.BYTE_ARRAY.AUTOSENSE;
        PrintRequestAttributeSet pras = new HashPrintRequestAttributeSet();

        PrintService printService[] = PrintServiceLookup.lookupPrintServices(
                flavor, pras);
        PrintService service = findPrintService(printerName, printService);


        DocPrintJob job = service.createPrintJob();

        try {

            byte[] bytes;

            // important for umlaut chars
            bytes = text.getBytes("CP437");

            if(cutAfter){

                byte[] cutP = new byte[] { 0x1d, 'V', 1 };

                byte[] combined = new byte[bytes.length + cutP.length];

                for (int i = 0; i < combined.length; ++i)
                {
                    combined[i] = i < bytes.length ? bytes[i] : cutP[i - bytes.length];
                }

                Doc doc = new SimpleDoc(combined, flavor, null);
                job.print(doc, null);

            }
            else
            {
                Doc doc = new SimpleDoc(bytes, flavor, null);
                job.print(doc, null);
            }




        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }

    public void printBytes(String printerName, byte[] bytes) {

        DocFlavor flavor = DocFlavor.BYTE_ARRAY.AUTOSENSE;
        PrintRequestAttributeSet pras = new HashPrintRequestAttributeSet();

        PrintService printService[] = PrintServiceLookup.lookupPrintServices(
                flavor, pras);
        PrintService service = findPrintService(printerName, printService);

        DocPrintJob job = service.createPrintJob();

        try {

            Doc doc = new SimpleDoc(bytes, flavor, null);

            job.print(doc, null);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private PrintService findPrintService(String printerName,
                                          PrintService[] services) {
        for (PrintService service : services) {
            if (service.getName().equalsIgnoreCase(printerName)) {
                return service;
            }
        }

        return null;
    }

    public String writeLineCenterAligned(String text, int totalCharsWidth)
    {
        StringBuilder sb = new StringBuilder();

        int margin = (totalCharsWidth - text.length()) / 2;

        for(int i = 0; i < margin; i++)
        {
            sb.append(" ");
        }
        sb.append(text);
        for(int i = 0; i < margin; i++)
        {
            sb.append(" ");
        }

        return sb.toString();
    }

    public String writeLineInColumn(String text, int columnWidth){

        String ret = "";

        text = text.length() > columnWidth ? text.substring(0, columnWidth) : text;

        int rightMargin = columnWidth - text.length();

        ret = text;
        for(int i = 0; i < rightMargin; i++) {
            ret += " ";
        }

        return ret;

    }
}

