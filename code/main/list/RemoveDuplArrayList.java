package list;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class RemoveDuplArrayList {
	public static void main(String[] args) {
		Logger log = LogManager.getLogger(RemoveDuplArrayList.class);
		// ����Ʈ ��ü���� ������������ ��. �ߺ� ����
		List<String> checkDu = new ArrayList<String>();
		
		for (int i = 0; i < args.length; i++) {
			String string = args[i];
			
		}
		checkDu.add("1");
		checkDu.add("2");
		checkDu.add("2");
		
		
		LinkedHashSet<String> hashSet = new LinkedHashSet<String>(checkDu);
		
		System.out.println(hashSet); // �ߺ��� 2�� ���ŵǰ� "[1, 2]"�� ���
	}
}
