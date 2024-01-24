import { appConfig } from "@/services/AppConfig";
const { apiBaseUrl } = appConfig;
export async function processFile({
  selectedFile,
  comp,
  upperPercent,
  lowerPercent,
  refId,
}) {
  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("comps", comp.toString());
  formData.append("upperPercent", upperPercent.toString());
  formData.append("lowerPercent", lowerPercent.toString());
  formData.append("refId", refId.toString());

  try {
    const response = await fetch(`${apiBaseUrl}/xlsx/process`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error; // Rethrowing the error to handle it in the calling function
  }
}

export async function generateComps(dataString: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/comps/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dataString }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (err) {
    console.error("Error in API call:", err);
    throw err; // Rethrow to handle in the calling function
  }
}
