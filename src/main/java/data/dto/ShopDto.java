package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("ShopDto")
public class ShopDto {

    private int sp_num;
    private int ur_num;
    private int pd_num;
    private String sp_title;
    private String sp_txt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone="Asia/Seoul")
    private Timestamp sp_wdate;
    private int sp_rdcnt;

}
