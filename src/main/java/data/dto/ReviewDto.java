package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("rvdto")
public class ReviewDto {
    private int sp_num;
    private int touser;
    private int rv_tmp;
    private String rv_txt;
    private int fromseller; //1이면 판매자로 부터 0이면 구매자로부터 받은 후기
    private int fromuser;
    //sp
    private String sp_title;
    private int ur_num;
    private int pd_num;

    //pd_img
    private String img_name;

    //ur_prf
    private String prf_nick;
    private String prf_img;
}
