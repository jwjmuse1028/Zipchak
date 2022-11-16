  package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class FeedListDto {
    private int fd_num;
    private int ur_num;
    private String fd_title;
    private String fd_txt;
    private String fd_img;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp fd_wdate;
    private int fd_rdcnt;
    private String fd_style;
    private int fd_likes;
    private String prf_nick;
    private String prf_img;

}
