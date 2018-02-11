$(function(){

	// 수정
	$(".list_wrap .item .ctrlBox .btnMod").on("click", function(){
		removeModify($(".list_wrap .item"), true); // 모든 item의 수정모드 해제

		var $thisItem = $(this).closest(".item");
		var txtCont = $thisItem.find(".cont").html();
		var no = $thisItem.find(".hd .rBox .no").text().replace("No.", "");
		console.log(txtCont);
		$thisItem.addClass("mod");
		$thisItem.find(".modifyBox").html(
			'<div class="txtArea"><textarea rows="5" name="content"></textarea></div>'
			+'<input type="hidden" name="no" value="' + no + '" />'
			+'<input type="hidden" name="modifyMod" value="true" />'
			+'<div class="btn_wrap">'
			+	'<input type="submit" class="btnReg" value="수정" />'
			+	'<a href="#" class="btn_type01 btnCancel">취소</a>'
			+'</div>'
		);
		$thisItem.find(".modifyBox .txtArea textarea").html(txtCont);
		return false;
	});

	// 수정취소
	$(document).on("click", ".list_wrap .item .modifyBox .btnCancel", function(){
		removeModify($(this));
		return false;
	});

	$(".personacon_list .i").on("click", function(){
		$(this).closest(".personacon_list").toggleClass("open");
		return false;
	});
	$(".personacon_list .p_l a").on("click", function(){
		var $this = $(this);
		var $wrap = $this.closest(".personacon_list");
		var selectAttr = $this.find("img").attr("src");
		$wrap.find(".i img").attr("src", selectAttr);
		$("#selectPersonacon").val(selectAttr.replace("personacon/", "").replace(".gif", "")); // ★ 한꺼번에 replace 할 수 있는 방법 없는지 찾아보기
		$this.closest(".personacon_list").removeClass("open");
		return false;
	});

});

// 수정모드 해제
function removeModify($trg, flag){
	var $item;
	var $modifyBox;
	if(flag){
		$item = $trg;
		$modifyBox = $trg.find(".modifyBox");
	} else {
		$item = $trg.closest(".item");
		$modifyBox = $trg.closest(".modifyBox");
	}
	$item.removeClass("mod");
	$modifyBox.empty();
}

/*
	<form method="post">
		<div class="modifyBox">
			<div class="txtArea"><textarea rows="5" name="">내용냉ㄴ욘ㅇㅇ</textarea></div>
			<input type="hidden" name="modifyMod" value="true" />
			<div class="btn_wrap">
				<input type="submit" class="btnReg" value="수정" />
				<a href="#" class="btnCancel">취소</a>
			</div>
		</div>
	</form>
*/