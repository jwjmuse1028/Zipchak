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
    private boolean cr_status;

    //from sp
    private String sp_title;

    //from pd
    private String pd_name;
    private String img_name;

    //from ur
    private String ur_id;
    private int ur_num;

    //from ur_prf
    private String buyer_nick;
    private String buyer_img;
    private String seller_nick;
    private String seller_img;

    //from cm
    private String msg;
    private int sender;
    //@JsonFormat(pattern = "yyyy년MM월dd일 HH:mm",timezone = "Asia/Seoul")
    private Timestamp cm_wdate;
    private int is_read;

}
