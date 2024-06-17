//___________________________________________________________________________________________________________________________________________________________
//| #Index
//|___________________________________________________________________________________________________________________________________________________________
//| Index		Description
//|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//| #0			Bảng biến
//| #1			Setup biến toàn cục
//| #2			Thêm 1 hàng cả 3 bảng
//| #3			Xóa 1 hàng cả 3 bảng
//| #4			Setup
//| #5			Reset
//| #6			In bảng
//| #7			Thuật toán FCFS
//| #8			Thuật toán SJF
//| #9			Thuật toán SRTF
//| #10		Thuật toán Round-Robin
//| #11		Tính trung bình
//| $1÷$10		Step-by-step
//| __________________________________________________________________________________________________________________________________________________________

//___________________________________________________________________________________________________________________________________________________________
//| #0 #Bảng biến/...
//|___________________________________________________________________________________________________________________________________________________________
//| Name				Type			HTML Link	HTML Link Type	Initial Value		Dec Idx	Definition/Function/Description
//|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//| arrP				glo obj arr		-			-				[]				#1		object array process, storing processes' info
//| arrR				glo obj arr		-			-				[]				#1		ready array, storing waiting processes to be run by status
//| aTime				glo var num		a{i}			get id			0				#1		get arrival time to push into arrP
//| bTime				glo var num		b{i}			get id			0				#1		get burst time to push into arrP
//| bMax				func var num		-			-				-1				#4		max burst time (for checking RR's condition before running)
//| cTime				glo var num		c1			get id			0				#1		cpu time
//| qTime				glo var num		q1			get id			0				#1		quantum time
//| runningTime		glo var num		-			-				999 999 999		#1		dynamically linking with min arrP elements' aTime
//| type				func var num		-			-				-				#4		0:FCFS | 1:SJF | 2:SRTF | 3:RR
//| type				func var num		-			-				-				#5		0:All | 1:Except pTable's rows
//| pTabRow			global var num		-			-				1				#1		counting pTable's row
//| pTableBody			func const obj arr	#pTableBody	get id			#pTableBody{}	#2÷3	reference to table.pTable tbody
//| pNewRow			func const obj arr	#pTableBody	append			tr{}				#2		create an empty tr object array that will append its info to pTableBody
//| pPHead			func const obj arr	-			-				th{}				#2		create an empty th object array
//| pArrivalCell			func const obj arr	-			-				td{}				#2		create an empty td object array
//| pArrivalInput		func const obj arr	-			-				input{}			#2		create an empty input object array
//| pBurstCell			func const obj arr	-			-				td{}				#2		create an empty td object array
//| pBurstInput			func const obj arr	-			-				input{}			#2		create an empty input object array
//| pButtonRow			func const obj arr	#pButRow	get id			#pButRow{}		#2		reference to table.pTable tbody tr #pButRow
//| gTableBody			func const obj arr	#gTableBody	get id			#pTableBody{}	#2÷3	reference to table.gTable tbody
//| gTableRow			func const obj arr	#row{r}		get id			#row{r}			#5‎÷6	reference to table.gTable tbody tr #row{r}
//| gTableCol			func var obj arr	#col{c}		get id			#col{c}			#7÷10	reference to table.gTable tbody tr td #row{r}col{c}
//| gNewRow			func const obj arr	#gTableBody	append			tr{}				#2		create an empty tr object array that will append its info to gTableBody
//| gPHead			func const obj arr	-			-				th{}				#2		create an empty th object array
//| gProcessCell			func const obj arr	-			-				td{}				#2÷6	create an empty td object array
//| dTableBody			func const obj arr	#dTableBody	get id			#dTableBody{}	#2÷3	reference to table.dTable tbody
//| dNewRow			func const obj arr	#dTableBody	append			tr{}				#2		create an empty tr object array that will append its info to dTableBody
//| dPHead			func const obj arr	-			-				th{}				#2		create an empty td object array
//| dRespondCell		func const obj arr	-			-				td{}				#2		create an empty td object array
//| dWaitingCell		func const obj arr	-			-				td{}				#2		create an empty td object array
//| dTurnaroundCell		func const obj arr	-			-				td{}				#2		create an empty td object array
//| dAVGRow			func const obj arr	#dAVGRow	get id			#dAVGRow{}	#2		reference to table.dTable tbody tr #dAVGRow
//| r					func var num		-			-				0				#4		increment number (for finding processes and stepping through arrP)
//| r					func var num		-			-				0				#4		increment number (for getting the gTableRow's row id)
//| r					func var num		-			-				0				#7÷10	increment number (for stepping through arrP and arrReady)
//| min				func var num		-			-				999 999 999		#9		for finding minimum value in the arrP and arrReady
//| idx				func var num		-			-				-1				#9		for finding the position of the element that has status=1 in the arrReady
//| status				func var num		-			-				0				#9		-1:remove | 0:not running | 1:running
//| gCells				func const obj arr	td			get tags			{'td','td'...} or {}	#5		reference to const gTableRow to take all elements have the same tag name
//| remainT			func var num		-			-				0				#10		depends on qTime's value
//| temp				func var ?			-			-				-				#9÷10	temporary var for switching sth
//| re | wa  | tu			func var num		-			-				0				#7÷10	for calculating respond | waiting | turnaround time (deleted)
//| __________________________________________________________________________________________________________________________________________________________

// #1 Setup biến toàn cục
let aTime=bTime=cTime=qTime=0;
let pTabRow=1;
let runningTime=999999999;
let arrP=arrR=[];

// #2 #Thêm 1 hàng ở cả 3 bảng
function runAddRow()
{
	pTabRow++;
	//___________________________________________________________
	//| $1 $Step-by-step: Thêm 1 dòng mới vào bảng pTable					|
	//|___________________________________________________________|
	//| Lấy id phần thân của bảng pTable								|
	//| Tạo hàng mới												|
	//| Tạo cell pPHead chứa tên header P{i} và append cell vào hàng đã tạo		|
	//| Tạo cell pArrivalCell và append vào hàng đã tạo						|
	//| Tạo cell pBurstCell và append vào hàng đã tạo						|
	//| Lấy id pButRow và append hàng vừa tạo vào trước hàng pButRow		|
	//|___________________________________________________________|
	const pTableBody=document.getElementById('pTableBody');

	const pNewRow=document.createElement('tr');

	const pPHead=document.createElement('th');
	pPHead.innerText=`P${pTabRow}`;
	pNewRow.appendChild(pPHead);

	const pArrivalCell=document.createElement('td');
	const pArrivalInput=document.createElement('input');
	pArrivalInput.type='number';
	pArrivalInput.name=`a${pTabRow}`;
	pArrivalInput.id=`a${pTabRow}`;
	pArrivalInput.size='10';
	pArrivalInput.min='-1';
	pArrivalInput.max='20';
	pArrivalInput.value='-1';
	pArrivalInput.className='inVal';
	pArrivalCell.appendChild(pArrivalInput);
	pNewRow.appendChild(pArrivalCell);

	const pBurstCell=document.createElement('td');
	const pBurstInput=document.createElement('input');
	pBurstInput.type='number';
	pBurstInput.name=`b${pTabRow}`;
	pBurstInput.id=`b${pTabRow}`;
	pBurstInput.size='10';
	pBurstInput.min='0';
	pBurstInput.max='20';
	pBurstInput.value='0';
	pBurstInput.className='inVal';
	pBurstCell.appendChild(pBurstInput);
	pNewRow.appendChild(pBurstCell);

	const pButtonRow=document.getElementById('pButRow');
	pTableBody.insertBefore(pNewRow,pButRow);

	//___________________________________________________________
	//| $2 $Step-by-step: Thêm 1 dòng mới vào bảng gTable					|
	//|___________________________________________________________|
	//| Lấy id phần thân của bảng gTable								|
	//| Tạo hàng mới												|
	//| Tạo cell gPHead chứa tên header P{i} và append header vào hàng đã tạo	|
	//| Tạo cell gProcessCell và append vào hàng đã tạo						|
	//| Append hàng vừa tạo vào cuối bảng gTable							|
	//|___________________________________________________________|
	const gTableBody=document.getElementById('gTableBody');

	const gNewRow=document.createElement('tr');
	gNewRow.id=`row${pTabRow}`;

	const gPHead=document.createElement('th');
	gPHead.innerText=`P${pTabRow}`;
	gNewRow.appendChild(gPHead);

	gTableBody.appendChild(gNewRow);
/*
	//___________________________________________________________
	//| $3 $Step-by-step: Thêm 1 dòng mới vào bảng dTable					|
	//|___________________________________________________________|
	//| Lấy id bảng													|
	//| Tạo hàng mới												|
	//| Tạo cell dPHead chứa tên header P{i} và append header vào hàng đã tạo	|
	//| Tạo cell dRespondCell và append vào hàng đã tạo					|
	//| Tạo cell dWaitingCell và append vào hàng đã tạo						|
	//| Tạo cell dTurnaroundCell và append vào hàng đã tạo					|
	//| Lấy id avgRow và append hàng vừa tạo vào trước hàng dAVGRow		|
	//|___________________________________________________________|
	const dTableBody=document.getElementById('dTableBody');

	const dNewRow=document.createElement('tr');

	const dPHead=document.createElement('th');
	dPHead.innerText=`P${pTabRow}`;
	dNewRow.appendChild(dPHead);

	const dRespondCell=document.createElement('td');
	dRespondCell.innerText=`0`;
	dRespondCell.id=`r${pTabRow}`;
	dNewRow.appendChild(dRespondCell);

	const dWaitingCell=document.createElement('td');
	dWaitingCell.innerText=`0`;
	dWaitingCell.id=`w${pTabRow}`;
	dNewRow.appendChild(dWaitingCell);

	const dTurnaroundCell=document.createElement('td');
	dTurnaroundCell.innerText=`0`;
	dTurnaroundCell.id=`t${pTabRow}`;
	dNewRow.appendChild(dTurnaroundCell);

	const dAVGRow=document.getElementById('dAVGRow');
	dTableBody.insertBefore(dNewRow,dAVGRow);*/
	
	return;
}

// #3 #Xóa 1 hàng ở cả 3 bảng
function runDelRow()
{
	//___________________________________________________________
	//| $4 $Step-by-step: Deleting a row									|
	//|___________________________________________________________|
	//| Lấy id 3 bảng												|
	//| Kiểm tra luôn có ít nhất n dòng rồi xóa dòng trên dòng butRow đối với 	|
	//| 	bảng pTable; bảng dTable và xóa dòng dưới cùng đối với bảng gTable	|
	//|___________________________________________________________|
	const pTableBody=document.getElementById('pTableBody');
	const gTableBody=document.getElementById('gTableBody');
	//const dTableBody=document.getElementById('dTableBody');
	if (pTabRow>=2)
	{
		pTableBody.removeChild(pTableBody.children[pTabRow-1]);
		gTableBody.removeChild(gTableBody.children[pTabRow]);
		//dTableBody.removeChild(dTableBody.children[pTabRow-1]);
		pTabRow--;
	}
	return;
}

// #4 #Setup
//type 0:FCFS | 1:SJF | 2:SRTF |  3:RR
//return -1:Error | 0:Other | 1:Round-Robin
function runSetup(type)
{
	runReset(-1);
	let bMax=-1;
	let r=0;

	//___________________________________________________________
	//| $5 $Step-by-step: Setup										|
	//|___________________________________________________________|
	//| parseInt giá trị q1;a{i};b{i} vào qTime;aTime;bTime					|
	//| trường hợp nếu process có arrival time là -1 hoặc burst time là 0 thì skip 	|
	//| 	không thì sẽ cộng burst time của process đó vào cTime và tiện xét bMax|
	//|	để dùng cho việc xét điều kiện trước khi chạy thuật toán RR			|
	//| đẩy các biến theo thứ tự { process , aTime , bTime , status } vào arrP[]	|
	//| xem xét các điều kiện nếu vi phạm cho ra warning					|
	//|___________________________________________________________|

	qTime = parseInt(document.getElementById("q1").value);
	for (r=1 ; r<=pTabRow ; r++)
	{
		aTime=parseInt(document.getElementById(`a${r}`).value);
		bTime=parseInt(document.getElementById(`b${r}`).value);
		if(aTime==-1 || bTime==0 )
		{
			continue;
		} else
		{
			cTime += bTime;
			bMax= (bMax<bTime)? bTime : bMax ;
		}

		//Tạo nên một object có 3 thuộc tính: process P{i} dạng chuỗi, aTime; bTime,remainTime và status dạng số nguyên
        	arrP.push({process: `P${r}`,aTime,bTime,status: 0});
	}
	for(r=0 ; r<arrP.length ; r++)
	{
		if(arrP[r].aTime<runningTime)
		{
			runningTime=arrP[r].aTime;
		}
	}
	cTime+=runningTime;
	if(cTime==0 || arrP.length==0)
	{
		document.getElementById("n1").innerText = `CPU TIME IS 0 OR NO PROCESS IS INPUT... NO OUTPUT`;
		return -1;
	}
	if(type==3)
	{
		if(qTime==0)
		{
			document.getElementById("n1").innerText = `NO INPUT FOR QUANTUM TIME... NO OUTPUT FOR ROUND-ROBIN`;
			return -1;
		} else if (qTime>=bMax)
		{
			return 0;
		} else
		{
			return 1;
		}
	}
	return 0;
}

// #5 #Reset
function runReset(type)
{
	document.getElementById("n1").innerText = ``;
	aTime=bTime=cTime=qTime=0;
	runningTime=999999999;
	arrR=[];
	arrP=[];

	//___________________________________________________________
	//| $6 $Step-by-step: Xóa bảng gTable								|
	//|___________________________________________________________|
	//| duyệt từng dòng bằng cách get id dòng của bảng gTable				|
	//| lấy tất cả tag name 'td' đưa vào mảng gCells và xóa tất cả			  	|
	//|___________________________________________________________|

	for(let r=0 ; r<pTabRow+1 ; r++)
	{
		const gTableRow=document.getElementById(`row${r}`);
		if(gTableRow!=0)
		{
			const gCells=gTableRow.getElementsByTagName('td');
			while(gCells.length>0)
			{
				gCells[0]=gTableRow.removeChild(gCells[0]);
			}
		}
	}
	if(type==0)
	{
		while(pTabRow>=2)
		{
			runDelRow();
		}
	}
	return;
}

// #6 #In bảng
function runGraph()
{
	for(let r=0 ; r<pTabRow+1 ; r++)
	{
		const gTableRow=document.getElementById(`row${r}`);
		for(let c=0 ; c<=cTime ; c++)
		{
			const gProcessCell=document.createElement('td');
			if(r!=0)
			{
				gProcessCell.id=`row${r}col${c}`;
			}
			gProcessCell.innerText=`${c}`;
			gTableRow.appendChild(gProcessCell);
		}
	}
}

// #7 #Thuật toán FCFS
function runFCFS()
{
	if(runSetup(0)!=-1)	
	{
		runGraph();
		let gTableCol;
		let idx=-1;
		let r=0;

		//___________________________________________________________
		//| $7 $Step-by-step: FCFS										|
		//|___________________________________________________________|
		//| tìm process thỏa mãn aTime=runningTime để đưa vào mảng arrR		|
		//| nếu idx=-1 thì cho idx "chỉ" tới vị trí đầu mảng arrR và gán status=1 cho	|
		//|	tiến trình được idx "chỉ" tới									|
		//| tăng runningTime lên 1										|
		//| gán ô màu cho tiến trình được idx "chỉ" tới và giảm bTime đi 1			|
		//| nếu bTime của tiến trình đang chạy là 0 thì "xóa" khỏi arrR				|
		//| nếu runningTime chưa vượt qua cTime thì lặp từ dòng đầu tiên xuống	|
		//|___________________________________________________________|
	
		do
		{
			for(r=0 ; r<arrP.length ; r++)
			{
				if(arrP[r].aTime==runningTime)
				{
					gTableCol=document.getElementById(`row${parseInt(arrP[r].process[1])}col${arrP[r].aTime}`);
					gTableCol.style.backgroundColor="orange";
					arrR.push(arrP[r]);
				}
			}
			if(idx==-1)
			{
				idx=0;
				arrR[idx].status=1;
			}
			runningTime++;
			if(arrR[idx].aTime!=runningTime)
			{
				gTableCol=document.getElementById(`row${parseInt(arrR[idx].process[1])}col${runningTime}`);
				gTableCol.style.backgroundColor="red";
				arrR[idx].bTime-=1;
			}
			if(arrR[idx].bTime==0)
			{
				gTableCol=document.getElementById(`row${parseInt(arrR[idx].process[1])}col${runningTime}`);
				gTableCol.style.backgroundColor="gray";
				arrR.splice(idx,1);
				idx=-1;
			}
		} while(runningTime<cTime);
		avg();
	}
	return;
}

// #8 #Thuật toán SJF
function runSJF()
{
	if(runSetup(1)!=-1)
	{
		runGraph();
		let gTableCol;
		let min=999999999;
		let idx=-1;

		//___________________________________________________________
		//| $8 $Step-by-step: SJF											|
		//|___________________________________________________________|
		//| tìm process thỏa mãn aTime=runningTime để đưa vào mảng arrR		|
		//| nếu idx=-1 và tồn tại ít nhất 1 process trong mảng arrR thì duyệt mảng	|
		//|	arrR														|
		//| nếu có process nào có bTime nhỏ hơn min thì cho idx "chỉ" tới vị trí đó,	|
		//|	gán min là bTime của process được idx "chỉ" tới					|
		//| duyệt mảng arrR xong thì cho status của process được idx "chỉ" tới là 1	|
		//| tăng runningTime lên 1										|
		//| gán ô màu cho tiến trình đang được idx "chỉ" tới và giảm bTime đi 1		|
		//| nếu bTime của tiến trình đang chạy là 0 thì "xóa" khỏi arrR	 và thiết lập lại	|  
		//| nếu runningTime chưa bằng cTime thì lặp từ dòng đầu tiên xuống		|
		//|___________________________________________________________|

		do
		{
			for(r=0 ; r<arrP.length ; r++)
			{
				if(arrP[r].aTime==runningTime)
				{
					gTableCol=document.getElementById(`row${parseInt(arrP[r].process[1])}col${arrP[r].aTime}`);
					gTableCol.style.backgroundColor="orange";
					arrR.push(arrP[r]);
				}
			}
			if(idx==-1 && arrR.length>0)
			{
				for(r=0 ; r<arrR.length ; r++)
				{
					if(arrR[r].bTime<min)
					{
						idx=r;
						min=arrR[idx].bTime;
					}
				}
				arrR[idx].status=1;
			}
			runningTime++;
			if(arrR[idx].aTime!=runningTime)
			{
				gTableCol=document.getElementById(`row${parseInt(arrR[idx].process[1])}col${runningTime}`);
				gTableCol.style.backgroundColor="red";
				arrR[idx].bTime-=1;
			}
			if(arrR[idx].bTime==0)
			{
				gTableCol=document.getElementById(`row${parseInt(arrR[idx].process[1])}col${runningTime}`);
				gTableCol.style.backgroundColor="gray";
				arrR.splice(idx,1);
				idx=-1;
				min=999999999;
			}
		} while(runningTime<cTime);
		avg();
	}
	return;
}

// #9 #Thuật toán SRTF
function runSRTF()
{
	if(runSetup(2)!=-1)
	{
		runGraph();
		let min=999999999;
		let idx=idxR=-1;
		let gTableCol, temp;

		//___________________________________________________________
		//| $9 $Step-by-step: SRTF										|
		//|___________________________________________________________|
		//| tìm process thỏa mãn aTime=runningTime để đưa vào mảng arrR		|
		//| nếu arrR tồn tại 1 process thì bắt đầu duyệt mảng arrR tìm process bé hơn	|
		//|	min cà cho idx chỉ vào vị trí process đó và gán min là bTime của process|
		//| gán status=1 cho tiến trình có bTime nhỏ nhất trong mảng arrR			|
		//| nếu idx không chỉ đến vị trí 0, tức là vị trí của process đang chạy, thì "di	|
		//|	chuyển" process đang được idx "chỉ" tới đến đầu mảng				|
		//| nếu process vị trí 1 đang có status là 1 thì cho status của process đó về 0	|
		//|	và "di chuyển" process đó xuống cuối mảng arrR					|
		//| tăng runningTime lên 1										|
		//| gán ô màu cho tiến trình đang được idx "chỉ" tới và giảm bTime đi 1		|
		//| nếu bTime của tiến trình đang chạy là 0 thì "xóa" khỏi arrR và thiết lập lại	|
		//|	min và idx												|
		//| nếu runningTime chưa bằng cTime thì lặp từ dòng đầu tiên xuống		|
		//|___________________________________________________________|
		do
		{
			for(r=0 ; r<arrP.length ; r++)
			{
				if(arrP[r].aTime==runningTime)
				{
					gTableCol=document.getElementById(`row${parseInt(arrP[r].process[1])}col${arrP[r].aTime}`);
					gTableCol.style.backgroundColor="orange";
					arrR.push(arrP[r]);
				}
			}
			if(arrR.length>0)
			{
				for(r=0 ; r<arrR.length ; r++)
				{
					if(arrR[r].bTime<min)
					{
						idx=r;
						min=arrR[r].bTime;
					}
				}
				arrR[idx].status=1;
			}
			if(idx!=0)
			{	
				temp=arrR.splice(idx,1);
				arrR.unshift(temp[0]);
				if(arrR[1].status==1)
				{
					arrR[1].status=0;
					temp=arrR.splice(1,1);
					arrR.push(temp[0]);
				}
			}
			runningTime++;
			if(arrR[0].aTime!=runningTime)
			{
				gTableCol=document.getElementById(`row${parseInt(arrR[0].process[1])}col${runningTime}`);
				gTableCol.style.backgroundColor="red";
				arrR[0].bTime-=1;
			}
			if(arrR[0].bTime==0)
			{
				gTableCol=document.getElementById(`row${parseInt(arrR[0].process[1])}col${runningTime}`);
				gTableCol.style.backgroundColor="gray";
				arrR.splice(0,1);
				idx=-1;
				min=999999999;
			}
		} while(runningTime<cTime);
		avg();	
	}
	return;
}

// #10 #Thuật toán Round-Robin
function runRR()
{
	if(runSetup(3)!=-1)
	{
		if(runSetup(3)==0)
		{
			runFCFS();
			document.getElementById("n1").innerText = `QUANTUM TIME IS LARGER OR EQUAL THAN SOME PROCESS' BURST TIME, RUNNING FCFS INSTEAD`;
		} else
		{
			runGraph();
			let gTableCol, temp;
			let idx=-1;
			let r=remainT=0;

			//___________________________________________________________
			//| $10 $Step-by-step: RR											|
			//|___________________________________________________________|
			//| tìm process thỏa mãn aTime=runningTime để đưa vào mảng arrR		|
			//| nếu remainT=0 hoặc idx=-1 thì đặt lại remainT=qTime, sau đó xét nếu	|
			//|	idx=-1 thì cho idx "chỉ" đến vị trí đầu mảng arrR và gán status=1 cho	|
			//|	process được "chỉ" đến"										|
			//| không thì nếu idx vẫn đang "chỉ" đến vị trí đầu mảng thì cho status của	|
			//|	process được "chỉ" tới về 0 và đưa process đó vào cuối mảng arrR		|
			//| tăng runningTime lên 1										|
			//| gán ô màu cho tiến trình được idx "chỉ" tới và giảm bTime đi 1			|
			//| nếu bTime của tiến trình đang chạy là 0 thì "xóa" khỏi arrR				|
			//| nếu runningTime chưa bằng cTime thì lặp từ dòng đầu tiên xuống		|
			//|___________________________________________________________|

			do
			{
				for(r=0 ; r<arrP.length ; r++)
				{
					if(arrP[r].aTime==runningTime)
					{
						gTableCol=document.getElementById(`row${parseInt(arrP[r].process[1])}col${arrP[r].aTime}`);
						gTableCol.style.backgroundColor="orange";
						arrR.push(arrP[r]);
					}
				}
				if(remainT==0 || idx==-1)
				{
					remainT=qTime;
					if(idx==-1)
					{
						idx=0;
						arrR[idx].status=1;
					} else if(idx==0)
					{
						arrR[0].status=0;
						temp=arrR.splice(0,1);
						arrR.push(temp[0]);
					}
				}
				runningTime++;
				if(arrR[idx].aTime!=runningTime)
				{
					gTableCol=document.getElementById(`row${parseInt(arrR[idx].process[1])}col${runningTime}`);
					gTableCol.style.backgroundColor="red";
					arrR[idx].bTime-=1;
					remainT--;
				}
				if(arrR[idx].bTime==0)
				{
					gTableCol=document.getElementById(`row${parseInt(arrR[idx].process[1])}col${runningTime}`);
					gTableCol.style.backgroundColor="gray";
					arrR.splice(idx,1);
					idx=-1;
				}
			} while(runningTime<cTime);
			avg();
		}
	}
	return;
}

// // #11 #Tính trung bình
// function avg()
// {
// 	/*let re=wa=tu=0;
// 	for(let r=1 ; r<=pTabRow ; r++)
// 	{
// 		re+=parseInt(document.getElementById(`r${r}`).innerText);
// 		wa+=parseInt(document.getElementById(`w${r}`).innerText);
// 		tu+=parseInt(document.getElementById(`t${r}`).innerText);
// 	}
// 	re/=pTabRow;
// 	wa/=pTabRow;
// 	tu/=pTabRow;
// 	document.getElementById(`rAVG`).innerText=`${re}`;
// 	document.getElementById(`wAVG`).innerText=`${wa}`;
// 	document.getElementById(`tAVG`).innerText=`${tu}`;*/
// 	return;
// }