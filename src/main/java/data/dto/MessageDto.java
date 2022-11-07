package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("MessageDto")
public class MessageDto {

    private int msg_num;
    private int chat_list_num;
    private int status;
    private int is_seller_id;
    private String content;
    private int is_read;
    private Timestamp writeday;

}
