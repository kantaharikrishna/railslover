function addLetterToCell(letter){
	showError(letter, selectedCell._tag.split(',')[1],selectedCell._tag.split(',')[0]);
	var label = cc.LabelTTF.create(letter,  'Arial', 28, cc.size(32,16), cc.TEXT_ALIGNMENT_LEFT);
	label.setColor(new cc.Color3B(0,0,0));
	label.setPosition(new cc.Point(40,40));
	var selectedCellLetter = '';
	if(selectedCell.getChildren().length>0){
		selectedCellLetter = selectedCell.getChildByTag('label').getString()[0];
		if(selectedCellLetter != letter){
			selectedCell.removeChildByTag('label',false);
			selectedCell.addChild(label,0,'label');
			var seq = cc.Spawn.create(cc.FadeOut.create(0.5),cc.FadeIn.create(0.5));
			selectedCell.runAction(seq);
		}
	}
	else{
		selectedCell.addChild(label,0,'label');
		var seq = cc.Spawn.create(cc.FadeOut.create(0.5),cc.FadeIn.create(0.5));
		selectedCell.runAction(seq);
	}
}

function removeLetterFromCell(){
	if(selectedCell.getChildren().length == 0){
		return;
	}
	var letter = selectedCell.getChildByTag('label').getString()[0];
	showError(letter, selectedCell._tag.split(',')[1],selectedCell._tag.split(',')[0],true);
	if(selectedCell.getChildren().length>0){
		selectedCell.removeChildByTag('label',false);
		selectedCell.setColor(new cc.Color3B(175,175,175));
		var seq = cc.Spawn.create(cc.FadeOut.create(0.5),cc.FadeIn.create(0.5));
		selectedCell.runAction(seq);
	}
}

function showError(letter, row ,col, del){
	if(selectedCell.getChildren().length>0)
		if(selectedCell.getChildByTag('label').getString()[0] == letter && !del)
			return;

	del = del || false;
	var r = row - row % 3;
	var c = col - col % 3;
	var gridCnt=0, colCnt=0, rowCnt=0;
	for(var i = r; i < r + 3; i++) {
		for(var j = c; j < c + 3; j++) {
			if(grid.getChildByTag(j+','+i).getChildren().length > 0){
				if(grid.getChildByTag(j+','+i).getChildByTag('label').getString()[0] == letter){
					gridCnt++;
				}
			}
		}
	}
	for (var i = 0; i < 9; i++){
		if(grid.getChildByTag(i+','+row).getChildren().length > 0){
			if(grid.getChildByTag(i+','+row).getChildByTag('label').getString()[0] == letter){
				colCnt++;
			}
		}
	}
	for (var i = 0; i < 9; i++){
		if(grid.getChildByTag(col+','+i).getChildren().length > 0){
			if(grid.getChildByTag(col+','+i).getChildByTag('label').getString()[0] == letter){
				rowCnt++;
			}
		}
	}
	for(var i = r; i < r + 3; i++) {
		for(var j = c; j < c + 3; j++) {
			if(grid.getChildByTag(j+','+i).getChildren().length > 0){
				if(grid.getChildByTag(j+','+i).getChildByTag('label').getString()[0] == letter){
					if(!del){
						if(selectedCell._tag != j+','+i){
							selectedCell.setColor(new cc.Color3B(200,0,0));
							return;
						}
					}
					else{
						if(gridCnt < 3 && (colCnt<gridCnt || rowCnt<gridCnt))
							grid.getChildByTag(j+','+i).setColor(new cc.Color3B(255,255,255));
						else
							selectedCell.setColor(new cc.Color3B(175,175,175));
					}
				}
			}
		}
	}
	for (var i = 0; i < 9; i++){
		if(grid.getChildByTag(i+','+row).getChildren().length > 0){
			if(grid.getChildByTag(i+','+row).getChildByTag('label').getString()[0] == letter){
				if(!del){
					selectedCell.setColor(new cc.Color3B(200,0,0));
					return;
				}
				else
					if(colCnt<3 && (gridCnt<colCnt || rowCnt<colCnt))
						grid.getChildByTag(i+','+row).setColor(new cc.Color3B(255,255,255));
					else
						selectedCell.setColor(new cc.Color3B(175,175,175));
			}
		}
	}
	for (var i = 0; i < 9; i++){
		if(grid.getChildByTag(col+','+i).getChildren().length > 0){
			if(grid.getChildByTag(col+','+i).getChildByTag('label').getString()[0] == letter){
				if(!del){
					selectedCell.setColor(new cc.Color3B(200,0,0));
					return;
				}
				else
					if(rowCnt<3 && (gridCnt<rowCnt || colCnt<rowCnt))
						grid.getChildByTag(col+','+i).setColor(new cc.Color3B(255,255,255));
					else
						selectedCell.setColor(new cc.Color3B(175,175,175));
			}
		}
	}
	selectedCell.setColor(new cc.Color3B(175,175,175));
	return true;
}
function checkCompletion(){
	//check if completed
	var sudokuLength = grid.getChildren().length;
	var childCount = 0;
	for(var i=0; i<9; i++){
		for(var j=0; j<9; j++){
			if(Number(grid.getChildByTag(j+','+i).getColor().r) == 200){
				return;
			}
			if(grid.getChildByTag(j+','+i).getChildren().length > 0){
				childCount++;
			}
		}
	}
	if(childCount == sudokuLength){
		var score;
		console.log('Completed');
		var str = 'You completed the sudoku in '+start+' seconds';
		var bestTime = getCookie('time');
		if(bestTime != null){
			if(Number(bestTime)>start){
				str+='\nThis is your Best Time';
				score = start;
			}
			else{
				str+='\nYour Best Time was '+Number(bestTime)+' seconds';
				score = Number(bestTime);
			}
		}
		else{
			str+='\nThis is your Best Time';
			score = start;
		}
		setCookie('time',score,1);
		alert(str);
		window.location.reload();
	}
}
function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
	return null;
}
var start=0;
setInterval(tick, 1000);
function tick(){
	start++;
	document.getElementById('timer').innerText = start;
}
document.getElementById('best').innerText = getCookie('time') || 0;
