package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class FeedDto {
    private int fd_num;
    private int ur_num;
    private String fd_title;
    private String fd_txt;
    private String fd_img;
    private int fd_spc;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp fd_wdate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp fd_udate;
    private int fd_rdcnt;
    private String fd_lvtp;
    private String fd_fml;
    private String fd_anm;
    private String fd_style;

}
