package data.service;

import com.amazonaws.services.cloudwatch.model.InvalidFormatException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExcelUtil {

    public List<Map<String, String>> getListData(MultipartFile file) throws org.apache.poi.openxml4j.exceptions.InvalidFormatException {

        List<Map<String, String>> excelList = new ArrayList<>();

        try {
            OPCPackage opcPackage = OPCPackage.open(file.getInputStream());

//            @SuppressWarnings("resource")
            XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);

            // 첫번째 시트
            XSSFSheet sheet = workbook.getSheetAt(0);

            int rowIndex = 1;
            int columnIndex = 5;

            // 첫번째 행(0)은 컬럼 명이기 때문에 두번째 행(1) 부터 검색
            for (int i=rowIndex; i < sheet.getLastRowNum() + 1; i++) {
                XSSFRow row = sheet.getRow(0);

                // 빈 행은 Skip
                if (row.getCell(0) != null && !row.getCell(0).toString().isBlank()) {

                    Map<String, String> map = new HashMap<>();

                    for (int j = 0; j < columnIndex; j++) {
                        XSSFCell cell = row.getCell(j);
                        map.put(String.valueOf(sheet.getRow(0).getCell(j)), String.valueOf(sheet.getRow(i).getCell(j)));
                        System.out.println(sheet.getRow(i).getCell(j));
                    }

                    excelList.add(map);
                }
            }

        } catch (InvalidFormatException | IOException e) {
            e.printStackTrace();
        }

        return excelList;
    }
}
