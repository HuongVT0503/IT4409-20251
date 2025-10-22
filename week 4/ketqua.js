
//Highlight
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('highlight').addEventListener('click', highlight);
})

function highlight(){
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tr');
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll('td');
        const diemso = parseFloat(cells[4].textContent);
        if (diemso >= 4) {
            rows[i].classList.add('highlighttop');
        } else if (diemso<=0){
            rows[i].classList.add('highlightbottom');
        }
    }
}




//GPA

document.addEventListener('DOMContentLoaded', () =>{
document.getElementById('gpa_button').addEventListener('click', calcgpa);});

function calcgpa(){
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tr');
    let sum = 0;
    let count = 0;
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll('td');
        const diemso = parseFloat(cells[4].textContent);
        const tinchi = parseFloat(cells[3].textContent);
        if (!isNaN(diemso)) {
            sum += tinchi*diemso;
            count=count+tinchi;
        }
    }
    if (count > 0) {
        const gpa = sum / count;
        const result = document.getElementById('result');
        result.textContent = 'GPA: ' + gpa.toFixed(2);
        //document.getElementById('gpa').textContent = gpa.toFixed(2);
    }
    
    
 
}



//filter

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('filter').addEventListener('click', filter);
});

function filter() {
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tr');
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll('td');
        const diemso = parseFloat(cells[4].textContent);
        if (diemso >= 4) {
            rows[i].style.display = 'table-row';
        } else {
            rows[i].style.display = 'none';
        }
    }
}




//sort

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sort').addEventListener('click', sort);
});

function sort() {
    const table = document.querySelector('table');
    const rows = Array.from(table.querySelectorAll('tr'));

    rows.sort((a,b) => {          //<0 -> a truoc b; >0 -> a sau b; =0 -> giu nguyen
        
        const diemsoA = parseFloat(a.cells[4].textContent);
        const diemsoB = parseFloat(b.cells[4].textContent);

        const nopointa= isNaN(diemsoA);
        const nopointb= isNaN(diemsoB);
        if (nopointa && !nopointb) {
            return -1;
        }
        if (!nopointa && nopointb) {
            return 1;
        }

        return diemsoA - diemsoB;
    });

    for (let i = 0; i < rows.length; i++) {
        table.appendChild(rows[i]);
    }

}
