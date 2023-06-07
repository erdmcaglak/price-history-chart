//!---------------------------------Config-------------------------------------
var minPriceList = [20, 30, 30, 20, 30, 30, 20, 30, 30, 20, 30, 30];
var maxPriceList = [40, 30, 30, 40, 30, 30, 40, 30, 30, 40, 30, 30];
var monthlyList = [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 10]

var chartConfig = {
    containerClass:'.seg-chart-wrapper', //Wrapper class ismi
    type:'line', //Chart tipi (block v2 de gelicek)
    priceList:monthlyList, // price/minPrice listesi
    oldPriceList:maxPriceList, // maxPrice listesi
    graph:{
        cover:false, // Bir üst elementin tamamının kaplanması isteniyorsa true yapılmalı. True yapılırsa aşağıdaki width geçerli olmayacaktır
        width:1440, // Grafik genişliği
        height:720, // Grafik yüksekliği
        infoBox:{ // Güncel fiyatın bilgilerinin gözüktüğü kutu
            show:true, // Gözüküp gözükmeyeceği
            position:'ft', // Kutunun grafik üstündeki pozisyonu lt: left-top, lb: left-bottom, rt: right-top, rb: right-bottom, fl: follow-left, fr: follow-right, ft: follow-top, fb:follow-bottom
            borderRadius:8, // Info boxBorder Radius
            priceKey:'Price', // Info box içinde monthly seçiliyken gözükecek price key
            minPriceKey:'Min Price', // Info box içinde yearly seçiliyken gözükecek minPrice key
            maxPriceKey:'Max Price', // Info box içinde yearly seçiliyken gözükecek maxPrice key
            textColor:'#fff', // Info box içindeki price ve maxPrice rengi
            backgroundColor:'#454545', // Info box içindeki price ve maxPrice arka plan rengi
            headerBackground:'#000',// Info box içindeki price ve maxPrice arka plan rengi
            headerTextColor:'#fff'// Info box içindeki header arka plan rengi
        },
        currentValues:{
            show:true, // Noktaların üstüne gelindiğinde çıkan dashed çizginin gözüküp gözükmeyeceği
            color:'#ccc', // dashed çizginin rengi
            weight:1 // dashed çizginin kalınlığı
        },
        bgColor:{
            type:'linear', // gradient türünü belirtir (radial,linear)
            value:['#fff','#eee'], // Grafik arkaplan renkleri (Çoklu verilirse grandient olur)
            direction:'ttb', // Linear gradient yönü rtl: right to left / ltr: left to right / ttb: top to bottom / btt: bottom to top
        }
    },
    chartAxis:{
        color:'#000', // Axislerin rengi
        weight:1, // Axis kalınlığı
        space:50, // Axislerin kenardan uzaklığı
        showX:true, // X axisinin gözükmesi isteniyorsa true
        showY:true, // Y axisinin gözükmesi isteniyorsa true
        yAxisTicks:11, // Y axisi üzerinde gösterilecek değer sayısı
        xAxisTicks:31, // X axisi üzerinde gösterilecek değer sayısı
        line:{ //Axis üzerindeki değerleri gösteren çizgi ayarları
            width:5, // Genişlik
            color:'#000', // Renk
            fontSize: 12, // Font size
            fontFamily: 'Arial', // Font family
        }
    },
    line:{
        color:'blue', // Çizgi grafiğinde price için çizilen çizginin rengi
        weight:3, // Çizgi Grafiğinde çizilen çizgilerin kalınlığı
        speed:10, // Çizgi grafiğin çizilme hızı (Sayı arttıkça yavaşlar)
        oldPriceColor:'red', // Yearly seçildiğinde maxPrice çizgisinin rengi
    },
    dot:{ // Grafik üzerindeki çizgilerin kesişimi
        show:true, // Kesişimlerde nokta gözüküp gözükmeyeceği
        size:10, // Nokta büyüklüğü
        color:'blue', // Nokta rengi
        hoverScale: 1.7, // Noktanın bulunduğu alana hover edince büyüme oranı
        border:{ // Nokta border rengi ve kalınlığı
            color:'#000',
            weight:1,
        },        
    },
    oldDot:{ // Grafik üzerindeki çizgilerin kesişimi
        show:true, // Kesişimlerde nokta gözüküp gözükmeyeceği
        size:10, // Nokta büyüklüğü
        color:'red', // Nokta rengi
        hoverScale: 1.7, // Noktanın bulunduğu alana hover edince büyüme oranı
        border:{ // Nokta border rengi ve kalınlığı
            color:'#000',
            weight:1,
        },        
    },
    text:{
        fontSize:10, // Grafik üzerindeki text'lerin font-size'ı
        fontFamily:'Arial', // Grafik üzerindeki text'lerin font-family'si
        color:'#000', // Grafik üzerindeki text'lerin rengi
    },
    switchBox:{
        monthlyText : 'MONTHLY', // Switchbox aylık text'i
        yearlyText : 'YEARLY',// Switchbox yıllık text'i
        text:{
            fontSize: 14,// Switchbox içindeki yazıların font size'ı
            color: '#000',// Switchbox içindeki yazıların rengi
            fontFamily:'Roboto',// Switchbox içindeki yazıların fontFamily'si
            selectedColor:'#fff',// Switchbox içindeki yazılardan seçilmiş olanın rengi
        },
        borderColor:'#454545',// Switchbox border rengi
        borderWidth:'2',// Switchbox border kalınlığı
        selectedBackGround: '#454545',// Switchbox içindeki yazılardan seçilmiş olanın background'u
        nonSelectedBackground:'#fff',// Switchbox içindeki yazılardan seçilmemiş olanın background'u
    }
}


//!---------------------------------Helpers-------------------------------------
var helpers = {
    clone:function(obj){
        return JSON.parse(JSON.stringify(obj))
    },
    getDevice: function(){
        var windowWidth = window.innerWidth;
        var deviceTypes = {
            mobile: windowWidth < 768,
            tablet: windowWidth >= 768 && windowWidth < 1024,
            desktop: windowWidth >= 1024,
        }
        var deviceTypesArr = Object.keys(deviceTypes);
        var device;
        
        for(var i=0;i<deviceTypesArr.length;i++){
            if(deviceTypes[deviceTypesArr[i]]){
                device = deviceTypesArr[i];
            }
        }
        return device;
    },
    nodeToArr: function(arr){
        var holderArr = [];
        for(var i=0;i<arr.length;i++){
            holderArr.push(arr[i]);
        }
        return holderArr;
    },
    find: function(arr,callBack){
        var result;
        for(var i=0;i<arr.length;i++){
            var item = arr[i];
            if(callBack(item)){
                result = item;
                break;
            }
        }
        return result;
    },
    filter: function(arr,callBack){
        var resultArr = [];
        for(var i=0;i<arr.length;i++){
            var item = arr[i];
            if(callBack(item)){
                resultArr.push(item)
            }
        }
        return resultArr;
    },
    findIndex: function(arr,callBack){
        var result;
        for(var i=0;i<arr.length;i++){
            var item = arr[i];
            if(callBack(item)){
                result = i;
                break;
            }
        }
        return result;
    },
}

//!---------------------------------Defination-------------------------------------

// Create Canvas
var canvas = document.createElement('canvas');
var container = document.querySelector(chartConfig.containerClass)
var ctx = canvas.getContext('2d');
var maxPrice = Math.max(...chartConfig.priceList);
var selectedPriceRange = 'm'
var isAnimationFinish = true;

canvas.setAttribute('id','seg-chart')
container.appendChild(canvas);
//!---------------------------------Settings-------------------------------------

if(chartConfig.graph.cover){
    canvas.width = container.clientWidth;
}
else{
    canvas.width = chartConfig.graph.width;
    
}

canvas.height = chartConfig.graph.height;

//!---------------------------------Functions-------------------------------------

function drawCircle(x,y,index,isOldPrice){
    var dotObject;
    if(isOldPrice){
        dotObject = chartConfig.oldDot;
    }
    else{
        dotObject = chartConfig.dot;
    }
    var chartDot = document.createElement('span');
    chartDot.classList.add('seg-chart-dot');
    chartDot.setAttribute('data-index',index.toString())
    chartDot.style.backgroundColor =dotObject.color;
    chartDot.style.left = x+'px';
    chartDot.style.top = y+'px';
    chartDot.style.width = dotObject.size + 'px';
    chartDot.style.height = dotObject.size + 'px';
    chartDot.style.border = dotObject.border.weight + 'px solid ' + dotObject.border.color;
    container.append(chartDot);
}

function priceInfoBox(){
    var infoBox = document.createElement('div');
    infoBox.classList.add('seg-chart-info-box');
    infoBox.style.left='0';
    infoBox.style.top='0';
    infoBox.style.borderRadius = chartConfig.graph.infoBox.borderRadius + 'px'
    container.append(infoBox);
}

function destroyInfoBox(){
    if(document.querySelector('.seg-chart-info-box')){
        document.querySelector('.seg-chart-info-box').remove();
    }
    document.querySelectorAll('.selected-chart-dot').forEach(function(item){
        item.classList.remove('selected-chart-dot');
        item.style.transform = 'translate(-50%,-50%) scale(1)';
    })
}

function fillInfoBox (x,y,i){
    var infoBox = document.querySelector('.seg-chart-info-box');
    var currentPrice;
    var oldPriceDiv;
    var currentDate;
    var infoBoxObject = chartConfig.graph.infoBox;
    var lineColorPriceDiv;
    var lineColorOldPriceDiv;
    if(!document.querySelector('.seg-chart-info-box-price')){
        currentPrice = document.createElement('div');
        currentDate = document.createElement('div');
        lineColorPriceDiv = document.createElement('div');
        lineColorPriceDiv.classList.add('price-color');
        currentPrice.classList.add('seg-chart-info-box-price');
        currentDate.classList.add('seg-chart-info-box-date');
        infoBox.append(currentDate)
        if(selectedPriceRange === 'y'){
            lineColorOldPriceDiv = document.createElement('div');
            lineColorOldPriceDiv.classList.add('old-price-color');
            oldPriceDiv = document.createElement('div');
            oldPriceDiv.classList.add('seg-chart-info-box-old-price');
            infoBox.append(oldPriceDiv)
        }  
        else if(selectedPriceRange === 'm' && document.querySelector('.seg-chart-info-box-old-price')){
            document.querySelector('.seg-chart-info-box-old-price').remove();
        }
        
        infoBox.append(currentPrice)
    }
    else{
        currentPrice=document.querySelector('.seg-chart-info-box-price')
        currentDate=document.querySelector('.seg-chart-info-box-date');
        lineColorPriceDiv = document.querySelector('.price-color')
        if(selectedPriceRange === 'y' && !document.querySelector('.seg-chart-info-box-old-price')){
            lineColorOldPriceDiv = document.createElement('div');
            lineColorOldPriceDiv.classList.add('old-price-color');
            oldPriceDiv = document.createElement('div');
            oldPriceDiv.classList.add('seg-chart-info-box-old-price');
            document.querySelector('.seg-chart-info-box-price').before(oldPriceDiv)
        }else if(selectedPriceRange === 'y'){
            lineColorOldPriceDiv = document.querySelector('.old-price-color')
            oldPriceDiv = document.querySelector('.seg-chart-info-box-old-price');
        }else if(selectedPriceRange === 'm' && document.querySelector('.seg-chart-info-box-old-price')){
            document.querySelector('.seg-chart-info-box-old-price').remove();
        }
            
    }
    
    if(infoBoxObject.position === 'lt'){
        infoBox.style.left = chartConfig.chartAxis.space + 0 + 'px'
        infoBox.style.top = chartConfig.chartAxis.space + 0 + 'px'
        infoBox.style.transform = 'translate(-100%,-50%)'
    }
    else if(infoBoxObject.position === 'lb'){
        infoBox.style.left = chartConfig.chartAxis.space + 0 + 'px'
        infoBox.style.bottom = chartConfig.chartAxis.space + 0 + 'px'
        infoBox.style.transform = 'translate(-100%,-50%)'
    }
    else if(infoBoxObject.position === 'rt'){
        infoBox.style.right = chartConfig.chartAxis.space + 0 + 'px'
        infoBox.style.top = chartConfig.chartAxis.space + 0 + 'px'
        infoBox.style.transform = 'translate(-100%,-50%)'
    }
    else if(infoBoxObject.position === 'rb'){
        infoBox.style.right = chartConfig.chartAxis.space + 0 + 'px'
        infoBox.style.bottom = chartConfig.chartAxis.space + 0 + 'px'
        infoBox.style.transform = 'translate(-100%,-50%)'
    }
    else if(infoBoxObject.position === 'fl'){
        infoBox.style.left = x - 15 + 'px'  
        infoBox.style.top = y + 'px'
        infoBox.style.transform = 'translate(-100%,-50%)'
    }
    else if(infoBoxObject.position === 'fr'){
        infoBox.style.left = x + 15 + 'px'  
        infoBox.style.top = y + 'px'
        infoBox.style.transform = 'translate(0,-50%)'
    }
    else if(infoBoxObject.position === 'ft'){
        infoBox.style.left = x + 'px'  
        infoBox.style.top = y - 15 + 'px'
        infoBox.style.transform = 'translate(-50%,-100%)'
    }
    else if(infoBoxObject.position === 'fb'){
        infoBox.style.left = x + 'px'  
        infoBox.style.top = y + 15 + 'px'
        infoBox.style.transform = 'translate(-50%,0%)'
    }
    infoBox.style.display = 'block'
    infoBox.style.backgroundColor = infoBoxObject.backgroundColor;
    infoBox.style.color = infoBoxObject.textColor;

    var today = new Date();
    var thirtyDaysAgo = new Date(today.getTime() - ((chartConfig.priceList.length -1 -i )* 24 * 60 * 60 * 1000));

    var day = thirtyDaysAgo.getDate();
    var month = thirtyDaysAgo.getMonth() + 1;
    var year = thirtyDaysAgo.getFullYear();

    var formattedDate;

    if(selectedPriceRange === 'm'){
        formattedDate = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month +'/'+year;
    }
    else{
        var todayDate = today.getDate() === 31 ? today.getDate() +1 : today.getDate()
        var startDate = new Date(today.getFullYear() - 1, today.getMonth() +1, todayDate);
        for(var j=0;j <i;j ++){
            var _month = startDate.getMonth() + 1; // Ay değeri 0-11 arasında olduğu için +1 ekliyoruz
            var _year = startDate.getFullYear();
            formattedDate = (_month < 10 ? '0' : '') + _month + '/' + _year;
            
            startDate.setMonth(startDate.getMonth() + 1);
            startDate.setDate(1);
        }
    }
    lineColorPriceDiv.style.backgroundColor = chartConfig.line.color;

    

    currentPrice.innerText = infoBoxObject.priceKey +': ' + parseFloat(chartConfig.priceList[i]).toFixed(2);
    if(selectedPriceRange === 'y'){
        currentPrice.innerText = infoBoxObject.minPriceKey +': ' + parseFloat(chartConfig.priceList[i]).toFixed(2);
        oldPriceDiv.innerText = infoBoxObject.maxPriceKey +': ' + parseFloat(chartConfig.oldPriceList[i]).toFixed(2);
        lineColorOldPriceDiv.style.backgroundColor = chartConfig.line.oldPriceColor;
        oldPriceDiv.prepend(lineColorOldPriceDiv)
    }
    
    currentPrice.prepend(lineColorPriceDiv)
    currentDate.innerText = formattedDate;
    currentDate.style.backgroundColor = infoBoxObject.headerBackground;
    currentDate.style.color = infoBoxObject.headerTextColor;
}

function createInfoBoxWrapper(graphWidth,i,x,y){
    var wrapperWidth = graphWidth / (chartConfig.priceList.length - 1);
    var wrapperLeft = (wrapperWidth * (i-1)) + chartConfig.chartAxis.space;
    var currentWrapper = document.createElement('div');
    currentWrapper.classList.add('info-box-wrapper')
    currentWrapper.setAttribute('data-index',i.toString())
    currentWrapper.style.width = wrapperWidth + 'px';
    currentWrapper.style.left = wrapperLeft + 'px';
    container.append(currentWrapper);
    if(chartConfig.graph.currentValues.show){
        var xDashedLine=document.createElement('div');
        
        xDashedLine.classList.add('dashed-line-x');

        xDashedLine.style.borderWidth = chartConfig.graph.currentValues.weight +'px';
        xDashedLine.style.borderColor = chartConfig.graph.currentValues.color;

        xDashedLine.style.height = (canvas.height - chartConfig.chartAxis.space*2) + 'px';
        xDashedLine.style.bottom = chartConfig.chartAxis.space + 'px'

        currentWrapper.append(xDashedLine)
        
        
        currentWrapper.addEventListener('mouseleave',function(){
            currentWrapper.querySelector('.dashed-line-x').style.display="none"
            
        })
    }
    currentWrapper.addEventListener('mouseenter',function(){
        fillInfoBox(x,y,i);
        if(chartConfig.graph.currentValues.show){
            currentWrapper.querySelector('.dashed-line-x').style.display="block"
            var selector = '.seg-chart-dot[data-index="'+i+'"]'
            document.querySelectorAll('.selected-chart-dot').forEach(function(item){
                item.classList.remove('selected-chart-dot');
                var scale = 'transform:translate(-50%,-50%) scale(1)'
                item.style.transform = 'translate(-50%,-50%) scale(1)'
            })
            document.querySelectorAll(selector).forEach(function(item){
                item.classList.add('selected-chart-dot')
                item.style.transform = 'translate(-50%,-50%) scale('+chartConfig.dot.hoverScale+')'
            })
        }
        
        
    })
    
}

function drawChart(priceList,isOldPrice,drawAxisControl){
    animation = undefined;
    var _priceList;
    var lineColor;
    if(selectedPriceRange === 'y'){
        _priceList = chartConfig.oldPriceList;
    }
    else{
        _priceList=priceList;
    }

    if(isOldPrice){
        lineColor = chartConfig.line.oldPriceColor
    }
    else{
        lineColor = chartConfig.line.color
    }

    var graphHeight = canvas.height - 2 * chartConfig.chartAxis.space;
    var graphWidth = canvas.width - 2 * chartConfig.chartAxis.space;
    var maxValue = Math.max.apply(Math, _priceList);
    var minValue = 0;   
    var range = maxValue*3/2;
    var yRatio = graphHeight / range;
    var xRatio = graphWidth / (_priceList.length - 1);
    var animationSpeed = chartConfig.line.speed;
    
    ctx.beginPath();
    ctx.moveTo(chartConfig.chartAxis.space, canvas.height - chartConfig.chartAxis.space -(priceList[0] - minValue) * yRatio);

    var i =1;
    function loopInPriceList (){
        if(i < priceList.length){
            var x = chartConfig.chartAxis.space + (i-1) * xRatio;
            var y = canvas.height - chartConfig.chartAxis.space - (priceList[i-1] -minValue) * yRatio;
            var nextX = chartConfig.chartAxis.space + i * xRatio;
            var nextY = canvas.height - chartConfig.chartAxis.space - (priceList[i] -minValue) * yRatio;

            var currentPoint = { x: x, y: y };
            var dx = (nextX - x) / animationSpeed;
            var dy = (nextY - y) / animationSpeed;
            var animation = setInterval(frame, 1);

            function frame(){
                isAnimationFinish = false;
                if (parseFloat(currentPoint.x.toFixed(2)) >= parseFloat(nextX.toFixed(2)) && parseFloat(currentPoint.y.toFixed(2)) >= parseFloat(nextY.toFixed(2))){
                    clearInterval(animation);
                    if (priceList.length-1 >= i){
                        if(i!==0 && chartConfig.dot.show){
                            drawCircle(nextX,nextY,i,isOldPrice)
                        }
                        
                        if(i!==0 && chartConfig.graph.infoBox.show && !isOldPrice){
                            createInfoBoxWrapper(graphWidth,i,nextX,nextY)
                        }
                        i++;
                        if(i === priceList.length) {
                            isAnimationFinish = true;
                        }
                        loopInPriceList();
                    }
                    
                    
                }else {
                    currentPoint.x += dx;
                    currentPoint.y += dy;
    
                    // Önceki veri noktalarını çizme
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(currentPoint.x,currentPoint.y);
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = chartConfig.line.weight;
                    ctx.stroke();
    
                }
            }
        }
    }
    loopInPriceList()

    function drawAxisValues(){
        if(chartConfig.chartAxis.showY){
            var yTicks = chartConfig.chartAxis.yAxisTicks;
            var yIncrement = range / yTicks;
            var yTickGap = graphHeight / yTicks;

            ctx.fillStyle = chartConfig.text.color;
            ctx.font = chartConfig.chartAxis.line.fontSize + 'px ' + chartConfig.chartAxis.line.fontFamily;
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";

            for (var i = 0; i < yTicks; i++) {
                var tickValue = parseFloat(range - i * yIncrement).toFixed(1);
                var yPos = parseFloat(parseFloat(chartConfig.chartAxis.space + i * yTickGap).toFixed(1));
                ctx.fillText(tickValue.toString(), chartConfig.chartAxis.space - 10, yPos);
                ctx.beginPath();
                ctx.moveTo(chartConfig.chartAxis.space - chartConfig.chartAxis.line.width, yPos);
                ctx.lineTo(chartConfig.chartAxis.space, yPos);
                ctx.strokeStyle = chartConfig.chartAxis.line.color;
                ctx.stroke();
            }
        }

        if(chartConfig.chartAxis.showX){
            ctx.font = chartConfig.text.fontSize + 'px ' + chartConfig.text.fontFamily;
            ctx.fillStyle = chartConfig.text.color;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            var xTickSpacing = Math.ceil(chartConfig.priceList.length / chartConfig.chartAxis.xAxisTicks);
            if(selectedPriceRange === 'y'){
                
                var today = new Date();
                var todayDate = today.getDate() === 31 ? today.getDate() +1 : today.getDate()
                var startDate = new Date(today.getFullYear() - 1, today.getMonth()+1, todayDate);
                for(var i=0;startDate <= today;i += xTickSpacing){
                    var month = startDate.getMonth() + 1; // Ay değeri 0-11 arasında olduğu için +1 ekliyoruz
                    var year = startDate.getFullYear();
                    var formattedDate = (month < 10 ? '0' : '') + month + '/' + year;
                    if(i!== 0){
                        ctx.fillText(formattedDate, chartConfig.chartAxis.space + i * xRatio, canvas.height - chartConfig.chartAxis.space + 20);
                        ctx.beginPath();
                        ctx.moveTo(chartConfig.chartAxis.space + i * xRatio,canvas.height - chartConfig.chartAxis.space);
                        ctx.lineTo(chartConfig.chartAxis.space + i * xRatio,canvas.height - chartConfig.chartAxis.space +chartConfig.chartAxis.line.width);
                        ctx.strokeStyle = chartConfig.chartAxis.line.color;
                        ctx.stroke();
                    }
                    
                    startDate.setMonth(startDate.getMonth() + 1);
                    startDate.setDate(1);                    
                }
            }else{
                for (var i = 0; i < chartConfig.priceList.length; i += xTickSpacing) {
                    var today = new Date();
                    var thirtyDaysAgo = new Date(today.getTime() - ((chartConfig.priceList.length -1 -i )* 24 * 60 * 60 * 1000));
                    var day = thirtyDaysAgo.getDate();
                    var month = thirtyDaysAgo.getMonth() + 1;
    
                    var formattedDate = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month;
                    if(i!==0){
                        ctx.fillText(formattedDate, chartConfig.chartAxis.space + i * xRatio, canvas.height - chartConfig.chartAxis.space + 20);
                        ctx.beginPath();
                        ctx.moveTo(chartConfig.chartAxis.space + i * xRatio,canvas.height - chartConfig.chartAxis.space);
                        ctx.lineTo(chartConfig.chartAxis.space + i * xRatio,canvas.height - chartConfig.chartAxis.space +chartConfig.chartAxis.line.width);
                        ctx.strokeStyle = chartConfig.chartAxis.line.color;
                        ctx.stroke();
                    }
                }
            }
            
        }
    }
    if(drawAxisControl) drawAxisValues();
}

function setBackground(){
    // arka planı gradient ile boyama
    var gradient;    
    if(chartConfig.graph.bgColor.type === 'radial'){
        gradient = ctx.createRadialGradient(
          canvas.width/2, canvas.height/2, 0, // x, y, r of the starting circle
          canvas.width/2, canvas.height/2, canvas.width/2 // x, y, r of the ending circle
        );
    }
    else{
        var direction = chartConfig.graph.bgColor.direction;
        if (direction === 'ltr') {
            gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        } else if (direction === 'rtl') {
            gradient = ctx.createLinearGradient(canvas.width, 0, 0, 0);
        } else if (direction === 'ttb') {
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        } else if (direction === 'btt') {
            gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        }
    }
    
    for(var i=0;i<chartConfig.graph.bgColor.value.length;i++){
        var lengthControl = chartConfig.graph.bgColor.value.length -1 === 0 ? 1 : chartConfig.graph.bgColor.value.length -1
        var colorLength = parseFloat(parseFloat(1 / lengthControl).toFixed(2));
        var currentColor = chartConfig.graph.bgColor.value[i];
        gradient.addColorStop(parseFloat(parseFloat(colorLength * i).toFixed(2)), currentColor);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawAxis(){
    if(chartConfig.chartAxis.showX){
        // Draw x axis
        ctx.beginPath();
        ctx.strokeStyle = chartConfig.chartAxis.color;
        ctx.lineWidth = chartConfig.chartAxis.weight;
        ctx.moveTo(chartConfig.chartAxis.space, canvas.height-chartConfig.chartAxis.space);
        ctx.lineTo(canvas.width, canvas.height -chartConfig.chartAxis.space);
        ctx.stroke();
    }
    
    if(chartConfig.chartAxis.showY){
        // Draw y axis
        ctx.beginPath();
        ctx.strokeStyle = chartConfig.chartAxis.color;
        ctx.lineWidth = chartConfig.chartAxis.weight;
        ctx.moveTo(chartConfig.chartAxis.space, canvas.height -chartConfig.chartAxis.space);
        ctx.lineTo(chartConfig.chartAxis.space, 0);
        ctx.stroke();
    }
}

//!---------------------------------Functions Call-------------------------------------
function callChart(priceList,control,drawAxisControl){
    
    if(drawAxisControl) {
        setBackground();
        drawAxis();
    }
    drawChart(priceList,control,drawAxisControl);
}

callChart(chartConfig.priceList,false,true)

if(chartConfig.graph.infoBox.show){
    container.addEventListener('mouseenter',function(){
        priceInfoBox();
    })
    container.addEventListener('mouseleave',function(){
        destroyInfoBox();
    })
}

document.querySelector('.seg-switch').style.borderWidth = chartConfig.switchBox.borderWidth+'px'
document.querySelector('.seg-switch').style.borderColor = chartConfig.switchBox.borderColor;
document.querySelectorAll('.seg-switch .seg-switch-item').forEach(function(item){
    item.style.fontSize = chartConfig.switchBox.text.fontSize + 'px'
    item.style.color = chartConfig.switchBox.text.color;
    item.style.fontFamily = chartConfig.switchBox.text.fontFamily;
})
document.querySelector('.seg-switch .seg-switch-monthly').innerText = chartConfig.switchBox.monthlyText;
document.querySelector('.seg-switch .seg-switch-yearly').innerText = chartConfig.switchBox.yearlyText;
document.querySelector('.seg-switch .seg-selected-switch').style.color = chartConfig.switchBox.text.selectedColor;
document.querySelector('.seg-switch .seg-selected-switch').style.backgroundColor = chartConfig.switchBox.selectedBackGround;
document.querySelector('.seg-switch .seg-none-selected-switch').style.backgroundColor = chartConfig.switchBox.nonSelectedBackground;


document.querySelectorAll('.seg-switch-item').forEach(function(item){
    item.addEventListener('click',function(){
        if(helpers.nodeToArr(item.classList).indexOf('seg-selected-switch') >= 0 || !isAnimationFinish) return;
        document.querySelector('.seg-selected-switch').style.color = chartConfig.switchBox.text.color;
        document.querySelector('.seg-selected-switch').style.backgroundColor = chartConfig.switchBox.nonSelectedBackground;
        document.querySelector('.seg-selected-switch').classList.remove('seg-selected-switch')
        item.classList.add('seg-selected-switch');
        item.style.color = chartConfig.switchBox.text.selectedColor;
        item.style.backgroundColor = chartConfig.switchBox.selectedBackGround;
        selectedPriceRange = item.dataset.pricerange;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        document.querySelectorAll('.seg-chart-dot').forEach(function(item){
            item.remove();
        })

        document.querySelectorAll('.info-box-wrapper').forEach(function(item){
            item.remove();
        })
        if(selectedPriceRange === 'y'){
            chartConfig.priceList= minPriceList;
            chartConfig.oldPriceList= maxPriceList;

            callChart(chartConfig.oldPriceList,true,true);
            setTimeout(function(){
                callChart(chartConfig.priceList,false,false);
            },250)
        }
        else{
            chartConfig.priceList= monthlyList;
            callChart(chartConfig.priceList,false,true);
        }
    })
})