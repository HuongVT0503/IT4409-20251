import React from "react";
import { useState } from "react";



const SearchForm = ({onSearch}) => {
    const [sid, setSid] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!sid.trim()) return;
    onSearch(sid.trim());
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 12, margin:"auto" }}>
      <input
        id="sid"
        name="sid"
        placeholder="Nhập mã sinh viên…"
        value={sid}
        onChange={(e) => setSid(e.target.value)}
        style={{
          flex: 1,
          padding: "10px 12px",
          borderRadius: 8,
          border: "1px solid #000000ff",
          outline: "none",
        }}
      />
      <button
        id="tracuu"
        type="submit"
        style={{
          padding: "10px 16px",
          borderRadius: 8,
          border: "1px solid #000000ff",
          background: "#1c41a7ff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Tra cứu
      </button>
    </form>
  );
};

export default SearchForm;

