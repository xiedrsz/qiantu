function idChecked(inHKID){
	inHKID = inHKID.toUpperCase();
	var hkid_x1;
	var hkid_x2;
	var hkid_digit1;
	var hkid_digit2;
	var hkid_digit3;
	var hkid_digit4;
	var hkid_digit5;
	var hkid_digit6;
	var hkid_check_digit;
	var hkid_checked_digit;
	var hkid_sum,hkid_mod;
	var hkid_x1_num;
	var hkid_x2_num;
		if ((inHKID.substring(1, 2)>="A")&& (inHKID.substring(1, 2)<="Z")) {
			hkid_x1=inHKID.substring(0, 1);
			hkid_x2=inHKID.substring(1, 2);
			hkid_digit1=parseInt(inHKID.substring(2, 3));
			hkid_digit2=parseInt(inHKID.substring(3, 4));
			hkid_digit3=parseInt(inHKID.substring(4, 5));
			hkid_digit4=parseInt(inHKID.substring(5, 6));
			hkid_digit5=parseInt(inHKID.substring(6, 7));
			hkid_digit6=parseInt(inHKID.substring(7, 8));
			if (inHKID.substring(8, 9)=="(") {
				hkid_check_digit=parseInt(inHKID.substring(9, 10),16);
			} else {
				hkid_check_digit=parseInt(inHKID.substring(8, 9),16);
			}
			hkid_x1_num= select1(hkid_x1);
			hkid_x2_num=select2(hkid_x2);
			hkid_sum=(hkid_x1_num*9+hkid_x2_num*8+hkid_digit1*7+hkid_digit2*6+hkid_digit3*5+hkid_digit4*4+hkid_digit5*3+hkid_digit6*2);
			hkid_mod=(hkid_sum%11);
			hkid_checked_digit=11-hkid_mod;
//			if (hkid_check_digit=='10') {
//				hkid_check_digit="A";
//			} else if (hkid_check_digit=='11') {
//				hkid_check_digit="0";
//			} 
			if(hkid_checked_digit=="11"){
				hkid_checked_digit = "0";
			}
			if (hkid_check_digit!=hkid_checked_digit) {
//				alert("号码不正确！");
//				alert(document.getElementById("errorIDMessage").value);
				return false;
			}
			return true;
		} else {
			hkid_x1=" ";
			hkid_x2=inHKID.substring(0, 1);
			hkid_digit1=parseInt(inHKID.substring(1, 2));
			hkid_digit2=parseInt(inHKID.substring(2, 3));
			hkid_digit3=parseInt(inHKID.substring(3, 4));
			hkid_digit4=parseInt(inHKID.substring(4, 5));
			hkid_digit5=parseInt(inHKID.substring(5, 6));
			hkid_digit6=parseInt(inHKID.substring(6, 7));
			if (inHKID.substring(7, 8)=="(") {
				if(inHKID.length>10){
//					alert(document.getElementById("errorIDMessage").value);
					return false;
				}
			   hkid_check_digit=parseInt(inHKID.substring(8, 9),16);
			} else {
			   if(inHKID.length>8){
//			      alert(document.getElementById("errorIDMessage").value);
				  return false;
			   }
			   hkid_check_digit=parseInt(inHKID.substring(7, 8),16);
			}
			hkid_x1_num= select1(hkid_x1);
			hkid_x2_num=select2(hkid_x2);
			hkid_sum=(hkid_x1_num*9+hkid_x2_num*8+hkid_digit1*7+hkid_digit2*6+hkid_digit3*5+hkid_digit4*4+hkid_digit5*3+hkid_digit6*2);
			hkid_mod=(hkid_sum%11);
			hkid_checked_digit=11-hkid_mod;
//			if (hkid_check_digit=='10') {
//				hkid_check_digit="A";
//			} else if (hkid_check_digit=='11') {
//				hkid_check_digit="0";
//			} 
			if(hkid_checked_digit=="11"){
				hkid_checked_digit = "0";
			}
			if (hkid_check_digit!=hkid_checked_digit) {
//				alert("号码不正确！");
//				alert(document.getElementById("errorIDMessage").value);
				return false;
			}
			return true;
		}
}

function select1(hkid_x1){
	var hkid_x1_num;
	switch (hkid_x1) {
	case "A": return hkid_x1_num = 10;break;
	case "B": return hkid_x1_num = 11;break;
	case "C": return hkid_x1_num = 12;break;
	case "D": return hkid_x1_num = 13;break;
	case "E": return hkid_x1_num = 14;break;
	case "F": return hkid_x1_num = 15;break;
	case "G": return hkid_x1_num = 16;break;
	case "H": return hkid_x1_num = 17;break;
	case "I": return hkid_x1_num = 18;break;
	case "J": return hkid_x1_num = 19;break;
	case "K": return hkid_x1_num = 20;break;
	case "L": return hkid_x1_num = 21;break;
	case "M": return hkid_x1_num = 22;break;
	case "N": return hkid_x1_num = 23;break;
	case "O": return hkid_x1_num = 24;break;
	case "P": return hkid_x1_num = 25;break;
	case "Q": return hkid_x1_num = 26;break;
	case "R": return hkid_x1_num = 27;break;
	case "S": return hkid_x1_num = 28;break;
	case "T": return hkid_x1_num = 29;break;
	case "U": return hkid_x1_num = 30;break;
	case "V": return hkid_x1_num = 31;break;
	case "W": return hkid_x1_num = 32;break;
	case "X": return hkid_x1_num = 33;break;
	case "Y": return hkid_x1_num = 34;break;
	case "Z": return hkid_x1_num = 35;break;
	case " " :return hkid_x1_num = 36;break;
	}
}
	
function select2(hkid_x2){
	var hkid_x2_num;
	switch (hkid_x2) {
	case "A": return hkid_x2_num = 10;break;
	case "B": return hkid_x2_num = 11;break;
	case "C": return hkid_x2_num = 12;break;
	case "D": return hkid_x2_num = 13;break;
	case "E": return hkid_x2_num = 14;break;
	case "F": return hkid_x2_num = 15;break;
	case "G": return hkid_x2_num = 16;break;
	case "H": return hkid_x2_num = 17;break;
	case "I": return hkid_x2_num = 18;break;
	case "J": return hkid_x2_num = 19;break;
	case "K": return hkid_x2_num = 20;break;
	case "L": return hkid_x2_num = 21;break;
	case "M": return hkid_x2_num = 22;break;
	case "N": return hkid_x2_num = 23;break;
	case "O": return hkid_x2_num = 24;break;
	case "P": return hkid_x2_num = 25;break;
	case "Q": return hkid_x2_num = 26;break;
	case "R": return hkid_x2_num = 27;break;
	case "S": return hkid_x2_num = 28;break;
	case "T": return hkid_x2_num = 29;break;
	case "U": return hkid_x2_num = 30;break;
	case "V": return hkid_x2_num = 31;break;
	case "W": return hkid_x2_num = 32;break;
	case "X": return hkid_x2_num = 33;break;
	case "Y": return hkid_x2_num = 34;break;
	case "Z": return hkid_x2_num = 35;break;
	case " " :return hkid_x2_num = 36;break;
	}
}

export {
  idChecked
}