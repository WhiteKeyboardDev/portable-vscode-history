::.bat 기본 세팅 값
    ::모든 명령줄 끄기
    @echo off
    ::UTF8로 설정
    @chcp 65001
    ::모든 명령줄 clean
    cls


goto :CheckUAC

::관리자 권한 취득하기
	:CheckUAC
		::관리자 권한 체크
		>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
		if '%errorlevel%' NEQ '0' (
			goto :UACAccess
		) else ( 
			goto :Done 
		)
	:UACAccess
		cls
		echo.
		echo --- 관리자 권한이 없습니다. ---
		echo "ENTER"키(또는 "예" 버튼)를 눌러 관리자 권한을 취득 합니다...
		echo [참고 : 관리자 권한이 없기때문에 한번더 실행됩니다.]
		timeout 1 >nul
		::pause >nul
		
		::관리자 권한 주기위해 VBS파일을 생성
		echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
		echo UAC.ShellExecute "cmd", "/c """"%~f0"" """ + Wscript.Arguments.Item(0) + """ ""%user%""""", "%CD%", "runas", 1 >> "%temp%\getadmin.vbs"
		"%temp%\getadmin.vbs" "%file%"

		::관리자 권한 완료후 VBS파일 삭제
		del "%temp%\getadmin.vbs"
		exit /b
	:Done
		cls
		echo.
		echo --- 관리자 권한을 취득하였습니다. ---
		echo 1초후에 다음설치 단계로 이동...
		timeout 1

		::여기서부터 권리자 권한 필요한 명령어 입력
        start "" "E:\001-Dev\001-IDE\Visual Studio Code\001-Potable\VSCode-win32-x64-1.71.2\Code.exe"
        start "" "E:\001-Dev\001-IDE\Eclipse\003-potableInstaller\eclipse_2022-09\eclipse-jee-2022-09-R-win32-x86_64"
        start "" "E:\001-Dev\003-MariaDB\001-HeidiSQL\12.0.64\HeidiSQL_12.0_64_Portable\heidisql.exe"
        start "" "E:\001-Dev\004-Terminal\MobaXterm\v22.0\MobaXterm_Portable_v22.0\MobaXterm_Personal_22.0.exe"
        start "" "E:\001-Dev\NotePad++\npp.8.4.1.portable.x64\notepad++.exe"
		exit
        pause
		