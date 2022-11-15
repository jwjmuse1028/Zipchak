package util;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.joda.time.DateTime;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class DataCrawling {

    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static final String WEB_DRIVER_PATH = "C:\\chromedriver.exe";

    public static void main(String[] args) throws IOException {

        File file = new File("C:\\Users\\bitcamp\\Desktop\\crawlingdata.xlsx");

        FileInputStream inputStream = new FileInputStream(file);

        Workbook workbook = new XSSFWorkbook(inputStream);

        Sheet sheet = workbook.getSheet("Sheet1");

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

        int i=1;

        int num=0;

        while (num<1){
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
            String fd_spc = option.get(1).getText();
            String fd_style = option.get(2).getText();
            String fd_fml = option.get(3).getText();
            String fd_rdcnt = "0";
            String fd_wdate = new DateTime().toString();
            String fd_udate = "";

            List<WebElement> txt = body.findElements(By.className("project-detail-image-block__image"));
            for(int j=0;j<txt.size();j++){
                fd_txt+=txt.get(j).getAttribute("src")+",";
            }
//            fd_txt = fd_txt.substring(0,10000);

            Row newRow = sheet.createRow(rowCount+1);
            Row row = sheet.getRow(0);

            excelData.add(Integer.toString(i));
            excelData.add(Double.toString((int)Math.ceil(Math.random()*5)));
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

            i+=1;
            rowCount++;
            num++;

            driver.navigate().back();

            try{Thread.sleep(3000);} catch (InterruptedException e1 ){}

            System.out.println(fd_txt.length());
        }

        inputStream.close();

        FileOutputStream outputStream=new FileOutputStream(file);

        workbook.write(outputStream);

        outputStream.close();

    }
}
