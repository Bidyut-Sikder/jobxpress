import React from "react";

const EmailTemplate = (job: string,url:string) => {

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "24px",
        backgroundColor: "#f9f9f9",
        color: "#333",
        lineHeight: "1.6",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "22px",
          fontWeight: 700,
          color: "#222",
          marginBottom: "24px",
        }}
      >
        Latest Job Opportunities from JobXpress
      </h2>
      <div
        dangerouslySetInnerHTML={{ __html: job }}
        style={{ marginBottom: "20px" }}
      />
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <a
          href={url}
          style={{
            backgroundColor: "#007bff",
            color: "#ffffff",
            padding: "12px 28px",
            textDecoration: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: 600,
            display: "inline-block",
          }}
        >
          View More Jobs
        </a>
      </div> 

      <p
        style={{
          marginTop: "30px",
          fontSize: "12px",
          color: "#888",
          textAlign: "center",
        }}
      >
        This email was sent to you by JobXpress. If you no longer wish to
        receive job alerts, you can{" "}
        <a
          href={`${process.env.NEXT_PUBLIC_URL}/unsubscribe`}
          style={{
            color: "#007bff",
            textDecoration: "none",
          }}
        >
          unsubscribe here
        </a>
        .
      </p>
    </div>
  );
};

export default EmailTemplate;
