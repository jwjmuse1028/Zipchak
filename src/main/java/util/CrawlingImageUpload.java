package util;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.io.*;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CrawlingImageUpload{

    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static final String WEB_DRIVER_PATH = "C:\\chromedriver.exe";

    public static void main(String[] args) throws IOException {

        File file = new File("C:\\Users\\bitcamp\\Desktop\\crawlingdata.xlsx");

        FileInputStream inputStream = new FileInputStream(file);

        Workbook workbook = new XSSFWorkbook(inputStream);

        Sheet sheet = workbook.getSheet("sp");

        int rowCount = 0;

        try{
            System.setProperty(WEB_DRIVER_ID,WEB_DRIVER_PATH);
        }catch (Exception e){
//            e.printStackTrace();
        }

/*        ChromeOptions options =  new ChromeOptions();

        options.addArguments("headless");*/

        WebDriver driver = new ChromeDriver();

        String url="https://store.ohou.se/today_deals";
        driver.get(url);

        WebElement item = driver.findElement(By.className("css-mga9c9"));

        try{
            Thread.sleep(2000);

            int num=1;

            while (num<101){

                List<WebElement> el1 = driver.findElements(By.className("css-9af4ho"));

                el1.get(num).click();

                List<String> excelData = new ArrayList<>();

                try{Thread.sleep(2000);} catch (InterruptedException e1 ){}

                WebElement el2 = driver.findElement(By.className("production-selling-overview"));

                String pd_ctg = el2.findElement(By.className("commerce-category-breadcrumb__entry")).findElement(By.tagName("a")).getText();

                String sp_title = el2.findElement(By.className("production-selling-header__title__name")).getText();

                String pd_price = el2.findElement(By.className("production-selling-header__price__price"))
                        .findElement(By.className("number")).getText().replace(",","");

                String pd_status = "onsale";

                List<WebElement> img = el2.findElements(By.className("production-selling-cover-image__list__item"));

                InputStream is;
                FileOutputStream fos;

                String img_name = "";

                //이미지 s3 저장
                for(WebElement wimg:img){
                    int qidx = wimg.findElement(By.className("image")).getAttribute("src").indexOf('?');
                    String img_info = wimg.findElement(By.className("image")).getAttribute("src").substring(0,qidx);

                    File iFolder = new File("D:/image/"+num);
                    if(!iFolder.exists()) {
                        iFolder.mkdirs();
                    }

                    URL iUrl=new URL(img_info);
                    is=iUrl.openStream();
                    int sidx = img_info.lastIndexOf('/');
                    img_info = img_info.substring(sidx);

                    img_name+=img_info+",";

                    fos=new FileOutputStream("D:/image/"+num+"/"+img_info);
                    int b;
                    while((b=is.read())!=-1)
                        fos.write(b);

                    fos.close();
                }

                img_name = img_name.substring(0,img_name.length()-1);

                Row newRow = sheet.createRow(rowCount+1);
                Row row = sheet.getRow(0);

                excelData.add(sp_title);
                excelData.add(pd_price);
                excelData.add(pd_ctg);
                excelData.add(pd_status);
                excelData.add(img_name);

                for(int j=0;j<5;j++){
                    Cell cell=newRow.createCell(j);
                    cell.setCellValue(excelData.get(j));
                }

                rowCount++;
                num++;

                driver.navigate().back();

                if(num%8==0){
                    ((JavascriptExecutor) driver).executeScript("window.scrollTo(0, 1000)",item);
                }

                try{Thread.sleep(2000);} catch (InterruptedException e1 ){}
            }

            inputStream.close();

            FileOutputStream outputStream=new FileOutputStream(file);

            workbook.write(outputStream);

            outputStream.close();

        } catch (InterruptedException e ){}
    }
}
