package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("UserDto")
public class UserDto {

    private int ur_num;
    private String ur_id;
    private int lg_tp;
    private String info_name;
    private String info_sex;
    private String info_addr;
    private String info_hp;
    private String info_email;
    private String prf_nick;
    private String prf_img;
    private int prf_tmp;
    private String prf_msg;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone="Asia/Seoul")
    private Timestamp prf_sdate;
}
