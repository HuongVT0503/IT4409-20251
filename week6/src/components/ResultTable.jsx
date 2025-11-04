import React from "react";

const ResultTable = ({ rows }) => {
  if (!rows || rows.length === 0) {
    return (
      <div style={{ marginTop: 16, opacity: 0.8 }}>
        Không có dữ liệu để hiển thị.
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto", marginTop: 16 }}>
      <table
        style={{
            margin: "7vh auto",
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #000000ff",
          textAlign: "center",
        }}
      >
        <thead>
          <tr style={{ background: "#faf7fc" }}>
            <th style={th}>Mã HP</th>
            <th style={th}>Tên học phần</th>
            <th style={th}>Số tín</th>
            <th style={th}>Học kỳ</th>
            <th style={th}>Điểm số</th>
            <th style={th}>Điểm chữ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={`${r.cid}-${idx}`}>  {/*key prop*/}
              <td style={td}>{r.cid}</td>
              <td style={td}>{r.name}</td>
              <td style={tdCenter}>{r.credits}</td>
              <td style={tdCenter}>{r.term}</td>
              <td style={tdCenter}>{r.score}</td>
              <td style={tdCenter}>{r.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "8px",
  border: "1px solid #000000ff",
  fontWeight: 600,
};
const td = {
  padding: "10px 12px",
  border: "1px solid #000000ff",
  textAlign: "left",
};
const tdCenter = { ...td, textAlign: "center" };

export default ResultTable;
