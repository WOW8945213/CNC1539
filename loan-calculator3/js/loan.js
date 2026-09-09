function moneyFormat(num){

    return Math.round(num)
    .toLocaleString();

}




function resetForm(){

    location.reload();

}





function calculate(){


    // 基本資料

    let principal =
    Number(document.getElementById("money").value);



    let years =
    Number(document.getElementById("year").value);



    let annualRate =
    Number(document.getElementById("rate").value)
    /100;



    let months =
    years * 12;



    let monthRate =
    annualRate / 12;




    // 本息平均攤還公式

    let payment =
    principal *
    monthRate *
    Math.pow(1+monthRate,months)
    /
    (Math.pow(1+monthRate,months)-1);





    let totalPayment =
    payment * months;



    let totalInterest =
    totalPayment - principal;







    // 顯示結果卡


    document.getElementById("result").innerHTML = `


    <div class="result-title">

    ${years} 年貸款試算結果

    </div>



    <div class="summary">


        <div class="card">

            <div class="card-title">
            貸款本金
            </div>

            <div class="card-value">
            ${moneyFormat(principal)}
            元
            </div>

        </div>



        <div class="card">

            <div class="card-title">
            每月應繳金額
            </div>

            <div class="card-value">
            ${moneyFormat(payment)}
            元
            </div>

        </div>



        <div class="card">

            <div class="card-title">
            總利息金額
            </div>

            <div class="card-value">
            ${moneyFormat(totalInterest)}
            元
            </div>

        </div>



        <div class="card">

            <div class="card-title">
            總繳款金額
            </div>

            <div class="card-value">
            ${moneyFormat(totalPayment)}
            元
            </div>

        </div>



    </div>


    `;







    // 產生還款明細


    let remain = principal;



    let startYear =
    Number(document.getElementById("syear").value);



    let startMonth =
    Number(document.getElementById("smonth").value);



    let data=[];





    for(let i=1;i<=months;i++){



        let interest =
        remain * monthRate;



        let principalPart =
        payment - interest;



        remain -= principalPart;



        if(remain < 0){

            remain=0;

        }




        let y =
        startYear +
        Math.floor((startMonth+i-2)/12);



        let m =
        ((startMonth+i-2)%12)+1;



        data.push({

            period:i,

            date:
            y+"/"+String(m).padStart(2,"0"),

            payment:payment,

            principal:principalPart,

            interest:interest,

            remain:remain

        });


    }






    // 前8期 + 後8期


    let show;



    if(months <=16){

        show=data;

    }else{


        show=[

            ...data.slice(0,8),

            "more",

            ...data.slice(-8)

        ];


    }







    let table=`


<tr>

<th>期數</th>

<th>繳款日期</th>

<th>每月應繳</th>

<th>本金</th>

<th>利息</th>

<th>剩餘本金</th>

</tr>


`;







    show.forEach(item=>{


        if(item==="more"){


            table += `


<tr class="more">

<td colspan="6">

...... 中間期數省略 ......

</td>

</tr>


`;

            return;

        }





        table += `


<tr>

<td>
${item.period}
</td>


<td>
${item.date}
</td>


<td>
${moneyFormat(item.payment)}
</td>


<td>
${moneyFormat(item.principal)}
</td>


<td>
${moneyFormat(item.interest)}
</td>


<td>
${moneyFormat(item.remain)}
</td>


</tr>


`;



    });






    document.getElementById("table").innerHTML =
    table;



}
