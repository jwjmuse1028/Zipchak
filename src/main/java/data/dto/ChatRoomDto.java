package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("crdto")
public class ChatRoomDto {
    //from cr
    private int cr_num;
    private int sp_num;
    private int buyer_num;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp cr_wdate;

    //from pd
    private String pd_name;

    //from ur
    private String ur_id;
    private int ur_num;

    //from cm
    private String msg;
    private int sender;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp cm_wdate;
    private int is_read;

}
