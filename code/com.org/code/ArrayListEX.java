package code;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

import object.Stuent;

public class ArrayListEX {
	public static void main(String[] args) {
	 System.out.println("22");
	 
	 //����Ʈ ��ü���� ������������ ��. �ߺ� ����
	 List<String> checkDu = new ArrayList<String>();
		for(Stuent tmpUser : tmpList) {checkDu.add(tmpUser.getNum());}
		LinkedHashSet<String> hashSet = new LinkedHashSet<String>(checkDu);
	}
}
