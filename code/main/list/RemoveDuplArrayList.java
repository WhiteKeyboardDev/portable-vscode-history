package list;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class RemoveDuplArrayList {
	public static void main(String[] args) {
		Logger log = LogManager.getLogger(RemoveDuplArrayList.class);
		// 리스트 객체말고 단일형에서만 됨. 중복 제거
		List<String> checkDu = new ArrayList<String>();
		
		for (int i = 0; i < args.length; i++) {
			String string = args[i];
			
		}
		checkDu.add("1");
		checkDu.add("2");
		
		LinkedHashSet<String> hashSet = new LinkedHashSet<String>(checkDu);
		
		// 중복된 2가 제거되고 "[1, 2]"가 출력
		log.debug("hashSet : "+ hashSet); 
	}
}
