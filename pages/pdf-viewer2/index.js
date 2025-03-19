import { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

const PdfUploader = () => {
	const [file, setFile] = useState(null);
	const [image, setImage] = useState(null);
	const [pdfUrl, setPdfUrl] = useState(null);
	const [loading, setLoading] = useState(false);

	// Zoom 플러그인 추가
	const zoomPluginInstance = zoomPlugin();
	const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

	const handleFileChange = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			setFile(event.target.files[0]);
		}
	};

	const handleImageChange = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			setImage(event.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (!file || !image) {
			alert("DOCX 파일과 이미지 파일을 모두 선택해주세요.");
			return;
		}

		setLoading(true);

		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("image", image);

			const response = await fetch("http://localhost:8991/api/v1/user/docx/replace", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) throw new Error("PDF 변환 실패");

			const blob = await response.blob();
			const url = URL.createObjectURL(blob);
			setPdfUrl(url);

			console.log("PDF 변환 성공:", url);
		} catch (error) {
			console.error("Error fetching PDF:", error);
			alert("PDF 변환 중 오류가 발생했습니다.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
			<h2>DOCX 변환기</h2>

			{/* 파일 선택 */}
			<input type="file" accept=".docx" onChange={handleFileChange} />
			<br />
			<input type="file" accept="image/*" onChange={handleImageChange} />
			<br />

			{/* 변환 버튼 */}
			<button onClick={handleUpload} disabled={loading}>
				{loading ? "변환 중..." : "PDF 변환"}
			</button>

			{/* PDF 미리보기 (react-pdf 사용) */}
			{pdfUrl && (
				<div>
					<h3>PDF 미리보기</h3>

					{/* 확대/축소 버튼 */}
					<div style={{ marginBottom: "10px" }}>
						<ZoomOutButton />
						<ZoomPopover />
						<ZoomInButton />
					</div>

					<div style={{ height: "500px", border: "1px solid #ddd", overflow: "hidden" }}>
						<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
							<Viewer fileUrl={pdfUrl} plugins={[zoomPluginInstance]} />
						</Worker>
					</div>

					{/* PDF 다운로드 버튼 */}
					<a href={pdfUrl} download="converted.pdf">
						<button style={{ marginTop: "10px" }}>PDF 다운로드</button>
					</a>
				</div>
			)}
		</div>
	);
};

export default PdfUploader;
