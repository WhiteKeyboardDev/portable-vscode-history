package list;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

import object.Stuent;

public class RemoveArrayList {
	public static void main(String[] args) {

		// ����Ʈ ��ü���� ������������ ��. �ߺ� ����
		List<String> checkDu = new ArrayList<String>();
		for (Stuent tmpUser : tmpList) {
			checkDu.add(tmpUser.getNum());
		}
		LinkedHashSet<String> hashSet = new LinkedHashSet<String>(checkDu);
	}
}
