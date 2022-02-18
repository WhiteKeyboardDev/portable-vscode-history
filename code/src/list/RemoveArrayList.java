package list;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

import object.Stuent;

public class RemoveArrayList {
	public static void main(String[] args) {

		// 리스트 객체말고 단일형에서만 됨. 중복 제거
		List<String> checkDu = new ArrayList<String>();
		for (Stuent tmpUser : tmpList) {
			checkDu.add(tmpUser.getNum());
		}
		LinkedHashSet<String> hashSet = new LinkedHashSet<String>(checkDu);
	}
}
