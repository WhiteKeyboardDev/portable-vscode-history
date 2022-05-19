package tmp;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class createSQL {
	public static void main(String[] args) throws Exception {
		
		/* 1set 
		 * 
		 * 	INSERT INTO `SAC_APPROVER_INFO` (`APPROVE_ID`, `APPROVER_STEP`, `APPROVER_ID`, `MANDATE_ID`, `APP_CHECK`) VALUES ('20220518193455892042', '1', 'dhlee3', '', '');
			INSERT INTO `SAC_APPROVE` (`APPROVE_ID`, `REQUEST_DT`, `REQUESTER_ID`, `APP_TYPE`, `USER_TASK_MAP`, `APP_STEP`, `APP_STATUS`, `APP_CHECK`) VALUES ('20220518193455892042', '2022-05-18 19:34:55.892', 'dhlee4', 'G', '!', 0, 'w', NULL);
			INSERT INTO `SAC_APPROVE_DOCUMENT` (`APPROVE_ID`, `SERVER_IP`, `SERVER_ID`, `SERVER_PWD`, `HOME_DIR`, `SHELL`, `REMOVE_HOME_DIR`, `PROTOCOLS`, `APP_REQUEST_DESC`, `APP_AUTH_ROLE`) VALUES ('20220518193455892042', '192.168.0.201', 'sta2001t', '', '', '', '', 0, 'sta2001t', NULL);
			INSERT INTO `SAC_APPROVE_DOCUMENT` (`APPROVE_ID`, `SERVER_IP`, `SERVER_ID`, `SERVER_PWD`, `HOME_DIR`, `SHELL`, `REMOVE_HOME_DIR`, `PROTOCOLS`, `APP_REQUEST_DESC`, `APP_AUTH_ROLE`) VALUES ('20220518193455892042', '192.168.0.205', 'sta2001t', '', '', '', '', 0, 'sta2001t', NULL);
		 * 
		 * */

		ArrayList<String> script = new ArrayList<String>();
		
		
		LocalDateTime currentDate = LocalDateTime.now();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSSSSS");
		
		for (int i = 0; i < 100; i++) {
			currentDate = LocalDateTime.now();
			dtf = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSSSSS");
			String index = currentDate.format(dtf);

			//2022-05-18 19:34:55.892
			dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
			String index2 = currentDate.format(dtf);
			
			script.add(index);
			System.out.println("INSERT INTO `SAC_APPROVER_INFO` (`APPROVE_ID`, `APPROVER_STEP`, `APPROVER_ID`, `MANDATE_ID`, `APP_CHECK`) VALUES ('"+index+"', '1', 'dhlee3', '', '');");
			System.out.println("INSERT INTO `SAC_APPROVE` (`APPROVE_ID`, `REQUEST_DT`, `REQUESTER_ID`, `APP_TYPE`, `USER_TASK_MAP`, `APP_STEP`, `APP_STATUS`, `APP_CHECK`) VALUES ('"+index+"', '"+index2+"', 'dhlee4', 'G', '!', 0, 'w', NULL);");
			System.out.print("INSERT INTO `SAC_APPROVE_DOCUMENT` (`APPROVE_ID`, `SERVER_IP`, `SERVER_ID`, `SERVER_PWD`, `HOME_DIR`, `SHELL`, `REMOVE_HOME_DIR`, `PROTOCOLS`, `APP_REQUEST_DESC`, `APP_AUTH_ROLE`) VALUES");
			
			for (int j = 1; j < 101; j++) {
				if(j==100) {
					System.out.println(", ('"+index+"', '192.153.25."+j+"', 'ctast"+i+"b', '', '', '', '', 0, 'ctest"+i+"b', NULL);");
				}else if(j==1) {
					System.out.print("('"+index+"', '192.153.25."+j+"', 'ctast"+i+"b', '', '', '', '', 0, 'ctest"+i+"b', NULL)");
				}
				else {
					System.out.print(", ('"+index+"', '192.153.25."+j+"', 'ctast"+i+"b', '', '', '', '', 0, 'ctest"+i+"b', NULL)");
				}
			}
			
			Thread.sleep(2);
		}
		
		for(String tmp : script) {
			System.out.println("approveHandle('"+tmp+"', 'G', 'y', '0', 'dhlee4');");
		}
	}
}
