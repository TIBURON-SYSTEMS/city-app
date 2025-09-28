import { useCurrentContent } from "@/hooks/useCurrentContent";
import { compareImages } from "@/lib/compareImages";
import { PageContent } from "@/types/nav";
import { PhotoStage } from "@/types/photostage";
import { Camera, ChevronLeft, Loader2 } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export default function CameraView() {
  const { setCurrentContent } = useCurrentContent();

  // 1. **videoRef 的类型定义**:
  // 我们明确告诉 TypeScript，这个 ref 将连接到一个 HTMLVideoElement，
  // 并且初始值是 null。
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isCameraOpen, setIsCameraOpen] = useState(true);
  const [error, setError] = useState<string>("");
  const [photoStage, setPhotoStage] = useState<PhotoStage>(
    PhotoStage.BEFORE_FIRST
  );
  const [photoFirst, setPhotoFirst] = useState<string | null>(null);
  const [photoSecond, setPhotoSecond] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string>("");

  useEffect(() => {
    // const currentVideoElement = videoRef.current;

    const getCameraStream = async () => {
      try {
        // 请求视频流的 constraints
        const constraints: MediaStreamConstraints = {
          video: {
            // "environment" 表示后置摄像头 (对着环境/外面)
            // "user" 表示前置摄像头 (对着用户/人脸)
            facingMode: "environment",
          },
          audio: false,
        };

        // 尝试获取媒体流
        const stream: MediaStream =
          await navigator.mediaDevices.getUserMedia(constraints);

        const currentVideoElement = videoRef.current;

        // 2. **Ref 的类型检查**:
        // 在访问 videoRef.current 之前，必须确保它存在且是一个 HTMLVideoElement 实例
        if (currentVideoElement) {
          // 使用快照变量
          currentVideoElement.srcObject = stream;
          currentVideoElement.play().catch((playError) => {
            console.error("Video playback failed:", playError);
          });
        }
      } catch (err) {
        // 3. **Error 的类型断言和处理**:
        // 捕获到的 error 在 TypeScript 中默认是 unknown 类型，
        // 我们断言它是一个 MediaStreamError 来安全访问 name/message 属性。
        const mediaError = err as DOMException;

        console.error("Error accessing camera:", mediaError);

        let errorMessage = `无法访问摄像头：${mediaError.name}`;

        // 针对常见的错误类型给出更具体的提示
        if (
          mediaError.name === "NotAllowedError" ||
          mediaError.name === "SecurityError"
        ) {
          errorMessage =
            "摄像头访问被拒绝。请检查浏览器权限设置或确认您正在使用 HTTPS。";
        } else if (mediaError.name === "NotFoundError") {
          errorMessage = "未找到可用的摄像头设备。";
        } else {
          errorMessage += ` - ${mediaError.message}`;
        }

        setError(errorMessage);
      }
    };

    // 检查 navigator.mediaDevices 是否存在
    if (navigator.mediaDevices) {
      getCameraStream();
    } else {
      setError("您的浏览器不支持访问媒体设备（getUserMedia）。");
    }

    // 清理函数：在组件卸载时停止视频流
    return () => stopCamera();
  }, []);

  function stopCamera() {
    const element = videoRef.current;

    // 必须检查 videoRef.current 是否存在，以及 srcObject 是否被设置
    if (element && element.srcObject) {
      // 断言 srcObject 是 MediaStream 类型
      const stream = element.srcObject as MediaStream;

      // 停止所有的 tracks
      stream.getTracks().forEach((track) => track.stop());
      element.srcObject = null;
      console.log("Camera stream stopped.");
    }
  }

  function handleCloseCamera() {
    stopCamera();
    setIsCameraOpen(false);
    setCurrentContent(PageContent.CHALLENGES);
  }

  // **拍照功能**
  function handleTakePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // 設置 canvas 大小與 video 同步
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 把 video 當前影像繪製到 canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 取得 base64 圖片
    const imageDataUrl = canvas.toDataURL("image/png");
    // console.log("拍到的照片:", imageDataUrl);

    if (photoStage === PhotoStage.BEFORE_FIRST) {
      setPhotoFirst(imageDataUrl);
      setPhotoStage(PhotoStage.AFTER_FIRST);
    }

    if (photoStage === PhotoStage.AFTER_FIRST) {
      setPhotoSecond(imageDataUrl);
      setPhotoStage(PhotoStage.AFTER_SECOND);
    }
  }

  async function handleSubmit() {
    if (!photoFirst || !photoSecond) return;

    setPhotoStage(PhotoStage.SUBMITTING);
    const data = await compareImages(photoFirst, photoSecond);
    console.log(data);

    setResultText(data);
    setPhotoStage(PhotoStage.FINISHED);
    stopCamera();
    setIsCameraOpen(false);
  }

  function handleFinishCompare() {
    setCurrentContent(PageContent.CHALLENGES);
  }

  return (
    <>
      {isCameraOpen && (
        <div className="fixed inset-0 w-screen h-screen overflow-hidden z-50 flex flex-col">
          {error && (
            <p className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-red-600 bg-white p-2 rounded">
              {error}
            </p>
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          <canvas ref={canvasRef} className="hidden" />

          {photoFirst && (
            <img
              src={photoFirst}
              alt="Captured"
              className="absolute top-6 right-32 w-24 h-36 object-cover rounded-sm shadow-lg"
            />
          )}

          {photoSecond && (
            <img
              src={photoSecond}
              alt="Captured"
              className="absolute top-6 right-6 w-24 h-36 object-cover rounded-sm shadow-lg"
            />
          )}

          {photoStage === PhotoStage.SUBMITTING && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/70">
                <Loader2 className="h-8 w-8 animate-spin text-black" />
              </div>
            </div>
          )}

          {/* 返回按钮 */}
          <div
            className="absolute top-6 left-6 w-12 h-12 bg-white/70 backdrop-blur-md rounded-full shadow-md flex items-center justify-center active:scale-95 transition cursor-pointer"
            onClick={handleCloseCamera}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </div>

          <div className="absolute bottom-32 left-1/2 -translate-x-1/2">
            {(photoStage === PhotoStage.BEFORE_FIRST ||
              photoStage === PhotoStage.AFTER_FIRST) && (
              <div
                className="w-20 h-20 bg-white/70 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center active:scale-95 transition"
                onClick={handleTakePhoto}
              >
                <Camera className="w-10 h-10 text-gray-800" />
              </div>
            )}

            {photoStage === PhotoStage.AFTER_SECOND && (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-white/70 rounded-full shadow-lg 
             active:scale-95 transition font-medium tracking-wide 
             relative -translate-y-1/2"
              >
                SUBMIT
              </button>
            )}
          </div>
        </div>
      )}

      {!isCameraOpen &&
        photoStage === PhotoStage.FINISHED &&
        resultText !== "" && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
            <div className="max-w-lg p-6 text-center">
              <h2 className="text-xl font-bold mb-4">Compare Result</h2>
              <p className="text-gray-800 whitespace-pre-line">{resultText}</p>
            </div>

            <button
              className="mt-6 px-6 py-2 bg-black text-white rounded-full shadow-md active:scale-95 transition"
              onClick={handleFinishCompare}
            >
              OK
            </button>
          </div>
        )}
    </>
  );
}
