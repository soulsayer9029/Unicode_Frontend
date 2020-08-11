let a=0
let total_cases=document.querySelector("#total_cases")
let total_deaths=document.querySelector("#total_deaths")
let total_recovered=document.querySelector("#total_recovered")
let total_active_cases=document.querySelector("#active_cases")
let total_cases_per_million=document.querySelector("#cases_per_million")
fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
		"x-rapidapi-key": "c5d58e6967msh3f4f3f0fbdaa628p13eb8djsn66d180fdca4d"
	}
})
.then(response => {
	return (response.json());
})
.then(data=>{
    console.log(data)
    total_cases.innerHTML=data.world_total.total_cases
    total_deaths.innerHTML=data.world_total.total_deaths
    total_recovered.innerHTML=data.world_total.total_recovered
    total_active_cases.innerHTML=data.world_total.active_cases
    total_cases_per_million.innerHTML=data.world_total.total_cases_per_1m_population
	const table=document.querySelector(".table")
	var searchInput=document.querySelector("#searchCountry")
	var td;	
	var countries_stat=data.countries_stat
	var tr=document.getElementsByTagName('tr')
    for(let i = 0; i<countries_stat.length;i++){
        
        
		let row = table.insertRow(i+1);

        let country_name = row.insertCell(0);
        let cases = row.insertCell(1);
        let deaths = row.insertCell(2);
        let active_cases = row.insertCell(3);
		let recovered_per_country = row.insertCell(4);
		let tested=row.insertCell(5);
		let graph=row.insertCell(6)
		let more=row.insertCell(7)
		
        country_name.innerHTML = countries_stat[i].country_name;
        cases.innerHTML = countries_stat[i].cases;
        deaths.innerHTML = countries_stat[i].deaths;
        active_cases.innerHTML = countries_stat[i].active_cases;
        recovered_per_country.innerHTML = countries_stat[i].total_recovered;
		tested.innerHTML=countries_stat[i].total_tests;
		more.innerHTML=`<button class='btn btn-primary' data-toggle="modal" data-target="#countryModal" id='${countries_stat[i].country_name}'>Know More</button>`
		graph.innerHTML=`<button class='btn btn-success' data-toggle="modal" data-target="#graphModal" id='${countries_stat[i].country_name}'>View Graph</button>`
		

		
	}
	document.addEventListener('click',function(e){
		if(e.target.className==='btn btn-success'){
			
			let arr=undefined
			var nation=e.target.id
			countries_stat.forEach(function(c){
				if(c.country_name===nation){
					
					arr=c;
				}
			
			})
			
			const modalGraphTitle=document.querySelector('#graph-title')
			var a=(arr.active_cases)
			a=a.replace(/\,/g,'')
			a=parseInt(a)
			var b=arr.deaths
			b=b.replace(/\,/g,'')
			b=parseInt(b)
			var c=(arr.total_recovered)
			c=c.replace(/\,/g,'')
			c=parseInt(c)
			modalGraphTitle.innerHTML=`${arr.country_name} Covid-Graph`
			const modalGraphBody=document.querySelector('#graph-body')
			modalGraphBody.innerHTML=`<canvas id="myChart"></canvas>`
			var pieChart=document.querySelector('#myChart').getContext('2d');
			var covidChart=new Chart(pieChart,{
				type:'pie',
				data:{
					labels:['Active_cases','deaths','Recovered'],
					datasets:[{
						label:'people',
						data:[a,b,c],
						backgroundColor:['#0275d8','#d9534f','#5cb85c']
					}]
				},
				options:{}
			})
		}

	})
	document.addEventListener('click',function(e){
	
		if(e.target.className==='btn btn-primary'){
			
			let cou=undefined
			var country=e.target.id
			countries_stat.forEach(function(c){
				if(c.country_name===country){
					
					cou=c;
				}
			
			})
			
			const mtitle=document.querySelector('.modal-title')
			mtitle.innerHTML=`${cou.country_name} Covid-Data`
			const mbody=document.querySelector('.modal-body')
			mbody.innerHTML=`<ul><div class="row"><div class="col-md-6"><li>Cases:-${cou.cases }&nbsp</li>
								 <li> deaths:-${cou.deaths}</li>
								 <li>active cases:-${cou.active_cases}</li>
								 <li>Serious:-${cou.serious_critical}</li>
								 <li>deaths per million:-${cou.deaths_per_1m_population}</li></div>
								 <div class="col-md-6"><li>New cases:-${cou.new_cases }</li>
								 <li> New deaths:-${cou.new_deaths}</li>
								 <li>total tests:-${cou.total_tests}</li>
								 <li>total recovered:-${cou.total_recovered}</li>
								 <li>tests per million:-${cou.tests_per_1m_population}</li>
								 </div></div>
								 `
		}
	})
	
	
	searchInput.addEventListener("keyup",function(){
		var filter=searchInput.value.toUpperCase()
		for(let i=0; i<tr.length;i++){
			td=tr[i].getElementsByTagName("td")[0]
			if(td){
				
				let txtValue=td.textContent
				if(txtValue.toUpperCase().indexOf(filter) > -1){
					tr[i].style.display=""
				}else{
					tr[i].style.display="none"
				}
				
			}			
		}		
	})
})
.catch(err => {
	console.log(err);
})


