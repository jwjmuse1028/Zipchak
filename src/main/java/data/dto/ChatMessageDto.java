package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("cmdto")
public class ChatMessageDto {

    private int cm_num;
    private int cr_num;
    private int sender;
    private String msg;
    private int is_read;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp cm_wdate;

}
