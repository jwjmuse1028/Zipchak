package data.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

@Data
@Alias("ChatListDto")
public class ChatListDto {
    private int chat_list_num;
    private int seller_num;
    private int buyer_num;

}
