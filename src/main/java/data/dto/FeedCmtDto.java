package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class FeedCmtDto {
    private int cmt_num;
    private int fd_num;
    private int ur_num;
    private String prf_nick;
    private String prf_img;
    private String cmt_txt;
    private int cmt_rg;
    private int cmt_rs;
    private int cmt_rl;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp cmt_wdate;

}
