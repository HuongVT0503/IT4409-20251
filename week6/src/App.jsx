import { useState } from "react";
//import reactLogo from "./assets/react.svg"
//import viteLogo from "/vite.svg"
import "./App.css";
import ResultTable from "./components/ResultTable";
import SearchForm from "./components/SearchForm";
//import React, { useEffect } from "react"

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function grading(score) {
  const s = typeof score === "number" ? score : parseFloat(score);
  if (Number.isNaN(s)) return "F";
  if (s >= 9) return "A+";
  if (s >= 8.5) return "A";
  if (s >= 8) return "B+";
  if (s >= 7) return "B";
  if (s >= 6.5) return "C+";
  if (s >= 5.5) return "C";
  if (s >= 5) return "D+";
  if (s >= 4) return "D";
  return "F";
}

async function loadData() {
  try {
    const [svRes, hpRes, kqRes] = await Promise.all([
      fetch("/sinhvien.json"),
      fetch("/hocphan.json"),
      fetch("/ketqua.json"),
    ]);

    await wait(3000); //DELAY

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

////////

function App() {

  const [rows, setRows] = useState([]); //for result table
  const [loading, setLoading] = useState(false); //load statuxs
  const [error, setError] = useState("");



  async function handletracuu(sid) {

    setError("");
    setRows([]);
    setLoading(true);

    try {
      const { sinhvien, hocphan, ketqua } = await loadData();

      const sv = sinhvien.find((x) => String(x.sid) === String(sid)); //filtering
      //const.find():returns the 1st matching element
      //student object x
      //thi is more strict in type than the og  //    const sv = ketquatable.sinhvien.find(sinhvien => sinhvien.sid == sid);

      if (!sv) {
        setError("Không tìm thấy sinh viên.");
        setLoading(false); //obv
        return;
      }

      const kqHienTai = ketqua.filter((x) => String(x.sid) === String(sid));

      const builtRows = kqHienTai
        .map((kq) => {
          //1 kq=1 object of the table ketqua from json
          const hp = hocphan.find((h) => String(h.cid) === String(kq.cid));
          if (!hp) return null;

          const score = kq.score;
          const graded =
            typeof kq.grade === "string" && kq.grade.trim().length > 0; //better than the og  const graded = ketqua.grade && ketqua.grade.trim() !== "";
          const letter = graded ? kq.grade : grading(score);

          return {
            cid: hp.cid,
            name: hp.name,
            credits: hp.credits,
            term: kq.term,
            score: score,
            grade: letter,
          };
        })
        .filter(Boolean); //remove “falsey” values from an array: 0, "", null, undefined
      // .filter(row => row !== null && row !== undefined);

      //

      setRows(builtRows);
    } catch (e) {
      console.error(e);
      setError("Có lỗi xảy ra khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 960, margin: "24px auto", padding: "0 16px" }}>
      <h1>Tra cứu kết quả học tập</h1>


      {/*search form */}
      <SearchForm onSearch={handletracuu} />  


      {/*loading*/}
      {loading && 
      (<div style={{ marginTop: 16, fontStyle: "italic" }}>Đang tải...</div>)
      }
      
      
      {/*error*/}
      {error && (
        <div
          style={{
            marginTop: 16,
            color: "#b00020",
            background: "#fde7e9",
            padding: "8px 12px",
            borderRadius: 8,
          }}
        >
          {error}
        </div>
      )}


      {/*result table*/}
      {!loading && !error && <ResultTable rows={rows} />}

    </div>
  );
}

export default App;
