import React, { useState, useEffect } from "react";
import axios from "axios";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [reportData, setReportData] = useState({
    date: new Date().toLocaleDateString(),
    title: "",
    report: "",
    reportTo: "",
  });
  const [editReportId, setEditReportId] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    try {
      const res = await axios.get("http://localhost:8080/report", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReports(res.data.reports);
    } catch (error) {
      console.log(error);
    }
  };

  const createReport = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/report/create", reportData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getReports();
      setReportData({
        date: new Date().toLocaleDateString(),
        title: "",
        report: "",
        reportTo: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const startEditingReport = (reportId) => {
    setEditReportId(reportId);
  };

  const editReport = async (reportId, updatedReport) => {
    try {
      await axios.patch(
        `http://localhost:8080/report/edit/${reportId}`,
        updatedReport,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getReports();
      setEditReportId("");
      setReportData({
        date: new Date().toLocaleDateString(),
        title: "",
        report: "",
        reportTo: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReport = async (reportId) => {
    try {
      await axios.delete(`http://localhost:8080/report/delete/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getReports();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={createReport}>
        <input
          type="text"
          placeholder="title"
          value={reportData.title}
          onChange={(e) =>
            setReportData({ ...reportData, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Reports"
          value={reportData.report}
          onChange={(e) =>
            setReportData({ ...reportData, report: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="ReportTo"
          value={reportData.reportTo}
          onChange={(e) =>
            setReportData({ ...reportData, reportTo: e.target.value })
          }
        />
        <input type="submit" value="create" />
      </form>
      <div className="view">
        {reports &&
          reports.map((report) => (
            <div key={report._id} className="container">
              <p>Date: {report.date}</p>
              {editReportId === report._id ? (
                <>
                  <input
                    type="text"
                    placeholder="New Title"
                    value={reportData.title}
                    onChange={(e) =>
                      setReportData({ ...reportData, title: e.target.value })
                    }
                  />
                  <textarea
                    type="text"
                    placeholder="New Report"
                    value={reportData.report}
                    onChange={(e) =>
                      setReportData({ ...reportData, report: e.target.value })
                    }
                  />
                  <button onClick={() => editReport(report._id, reportData)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p>Title: {report.title}</p>
                  <p>Report: {report.report}</p>
                  <div>
                    <button onClick={() => startEditingReport(report._id)}>
                      Edit
                    </button>
                    <button onClick={() => deleteReport(report._id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Report;
