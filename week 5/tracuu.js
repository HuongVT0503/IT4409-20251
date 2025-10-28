// Khi người dùng nhập mã sinh viên:
// + Tra cứu thông tin sinh viên trong sinhvien.
// + Dựa vào sid để lấy danh sách học phần từ ketqua.
// + Dùng cid để tra thông tin chi tiết trong hocphan.
// Mô phỏng bất đồng bộ:
// + Dùng fetch() hoặc setTimeout() để giả lập việc lấy dữ liệu.
// + Xử lý bằng Promise hoặc async/await.
// + Hiển thị trạng thái “Đang tải...” khi đang truy vấn dữ liệu.
// + Xử lý lỗi bằng try...catch.

// async function loaddata() {
//     try{
//         const sinhvienpromise = await fetch("sinhvien.json");
//         const hocphanpromise = await fetch("hocphan.json");
//         const ketquapromise = await fetch("ketqua.json");

//         const[sinhvien, hocphan, ketqua] = await Promise.all([sinhvienpromise.json(), hocphanpromise.json(), ketquapromise.json()]);
//         return{sinhvien, hocphan, ketqua}
//     }catch(error){
//         console.log(error);
//     }
// }

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function grading(score) {
    if (score >= 9) return "A+";
    if (score >= 8.5) return "A";
    if (score >= 8) return "B+";
    if (score >= 7) return "B";
    if (score >= 6.5) return "C+";
    if (score >= 5.5) return "C";
    if (score >= 5) return "D+";
    if (score >= 4) return "D";
    return "F";
}

async function loaddata() {
    try {
        const [svRes, hpRes, kqRes] = await Promise.all([
            fetch("sinhvien.json"),
            fetch("hocphan.json"),
            fetch("ketqua.json"),
        ]);
        await wait(3000);//DELAY

        const [sinhvien, hocphan, ketqua] = await Promise.all([
            svRes.json(),
            hpRes.json(),
            kqRes.json(),
        ]);

        return { sinhvien, hocphan, ketqua };
    } catch (error) {
        console.error(error);
        throw error; //rethrow the error-> the func that called it can handle the eror -> prevent silent error
    }
}



async function tracuu(sid) {
    try {
        const ketquatable = await loaddata();

        const sv = ketquatable.sinhvien.find(sinhvien => sinhvien.sid == sid);
        if (!sv) {
            alert("Không tìm thấy sinh viên");
            return null;
        }

        const ketquahientai = ketquatable.ketqua.filter(ketqua => ketqua.sid == sid);

        return { ketquatable, ketquahientai };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function handletracuu(sid) {
    //localStorage.clear();
    

    const cacheKey = `kq_${sid}`;  //kq_20225135 //"kq_"+sid
    const table = document.getElementById("results");


    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        try {
            const cachedRows = JSON.parse(cachedData);
            table.innerHTML = "";
            cachedRows.forEach(row => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
          <td>${row.cid}</td>
          <td>${row.name}</td>
          <td>${row.credits}</td>
          <td>${row.term}</td>
          <td>${row.score}</td>
          <td>${row.grade}</td>
        `;
                table.appendChild(tr);
            });
            return;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    table.innerHTML = `<tr><td colspan="6">Đang tải...</td></tr>`;
    
    tracuu(sid)
        .then(result => {
            if (!result) return;

            const { ketquatable, ketquahientai } = result;

            

            const cachedData = [];
            table.innerHTML = "";


            ketquahientai.forEach(ketqua => {
                const hocphan = ketquatable.hocphan.find(hocphan => hocphan.cid == ketqua.cid);
                if (hocphan) {

                    //const numericscore = typeof ketqua.score === "number" ? ketqua.score : parseFloat(ketqua.score);
                    //const letter = (ketqua.grade && ketqua.grade.trim() !== "") ? ketqua.grade : grading(numericscore);
                    const scorelettter=grading(ketqua.score);

                    const graded = ketqua.grade && ketqua.grade.trim() !== "";
                    ketqua.grade = graded ? ketqua.grade : scorelettter;

                    const rowData = {
                        cid: hocphan.cid,
                        name: hocphan.name,
                        credits: hocphan.credits,
                        term: ketqua.term,
                        score: ketqua.score,
                        grade: ketqua.grade
                    };
                    cachedData.push(rowData);

                    const row = document.createElement("tr");
                    
                    row.innerHTML = `
                    <td>${hocphan.cid}</td>
                    <td>${hocphan.name}</td>
                    <td>${hocphan.credits}</td>
                    <td>${ketqua.term}</td>
                    <td>${ketqua.score}</td>
                    <td>${ketqua.grade}</td>
                `;
                    table.appendChild(row);
                }
            });

            localStorage.setItem(cacheKey, JSON.stringify(cachedData));
        })
        .catch(error => {
            console.log(error);
            
        });
}


document.getElementById("tracuu").addEventListener("click", () => {
    const sid = document.getElementById("sid").value;
    handletracuu(sid);
});

