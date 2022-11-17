package util;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class CrawlingImageUpload{

    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static final String WEB_DRIVER_PATH = "C:\\chromedriver.exe";

    public static void main(String[] args) throws IOException {

        File file = new File("C:\\Users\\bitcamp\\Desktop\\crawlingdata.xlsx");

        FileInputStream inputStream = new FileInputStream(file);

        Workbook workbook = new XSSFWorkbook(inputStream);

        Sheet sheet = workbook.getSheet("fd");

        int rowCount = 0;

        try{
            System.setProperty(WEB_DRIVER_ID,WEB_DRIVER_PATH);
        }catch (Exception e){
//            e.printStackTrace();
        }

/*        ChromeOptions options =  new ChromeOptions();

        options.addArguments("headless");*/

        WebDriver driver = new ChromeDriver();

        String url="https://ohou.se/projects?writer=self";
        driver.get(url);

        try{Thread.sleep(2000);} catch (InterruptedException e ){}

        int num=1;

        while (num<21){
            List<WebElement> el1 = driver.findElements(By.className("col-md-4"));

            el1.get(num).click();

            List<String> excelData = new ArrayList<>();

            try{Thread.sleep(2000);} catch (InterruptedException e1 ){}

            WebElement el2 = driver.findElement(By.className("content-detail"));

            WebElement header = el2.findElement(By.className("content-detail-header"));
            WebElement body = el2.findElement(By.className("project-detail__content-bpd"));

            String fd_title = header.findElement(By.className("content-detail-header__title")).getText();

            List<WebElement> option = el2.findElements(By.className("project-detail-metadata-overview-item"));

            String fd_txt = "";
            String fd_img = el2.findElement(By.tagName("img")).getAttribute("src");
            String fd_lvtp = option.get(0).getText();
            String fd_spc = option.get(1).getText().substring(0,option.get(1).getText().length()-1);
            String fd_style = option.get(2).getText();
            String fd_fml = option.get(3).getText();
            String fd_rdcnt = "0";
            String fd_wdate = "";
            String fd_udate = "";

            List<WebElement> img = body.findElements(By.className("project-detail-image-block__image"));

            List<WebElement> txt = body.findElements(By.tagName("p"));

            for(WebElement et:txt)
                fd_txt+=et.getText();

            InputStream is;
            FileOutputStream fos;

            //이미지 s3 저장
            /*for(WebElement wimg:img){
                int qidx = wimg.getAttribute("src").indexOf('?');
                String img_info = wimg.getAttribute("src").substring(0,qidx);

                File iFolder = new File("D:/image/"+num);
                if(!iFolder.exists()) {
                    iFolder.mkdirs();
                }

                URL iUrl=new URL(img_info);
                is=iUrl.openStream();
                int sidx = img_info.lastIndexOf('/');
                img_info = img_info.substring(sidx);

                fos=new FileOutputStream("D:/image/"+num+"/"+img_info);
                int b;
                while((b=is.read())!=-1)
                    fos.write(b);

                fos.close();
            }*/

            /*for(int j=0;j<txt.size();j++){
                fd_txt+=txt.get(j).getAttribute("src")+",";
            }
*/
            Row newRow = sheet.createRow(rowCount+1);
            Row row = sheet.getRow(0);

            excelData.add(Integer.toString(num));
            excelData.add(Integer.toString((int)Math.ceil(Math.random()*5)));
            excelData.add(fd_title);
            excelData.add(fd_txt);
            excelData.add(fd_img);
            excelData.add(fd_spc);
            excelData.add(fd_wdate);
            excelData.add(fd_udate);
            excelData.add(fd_rdcnt);
            excelData.add(fd_lvtp);
            excelData.add(fd_fml);
            excelData.add(fd_style);

            for(int j=0;j<row.getLastCellNum();j++){
                Cell cell=newRow.createCell(j);
                cell.setCellValue(excelData.get(j));
            }

            rowCount++;
            num++;

            driver.navigate().back();

            try{Thread.sleep(2000);} catch (InterruptedException e1 ){}
        }

        inputStream.close();

        FileOutputStream outputStream=new FileOutputStream(file);

        workbook.write(outputStream);

        outputStream.close();

    }
}
