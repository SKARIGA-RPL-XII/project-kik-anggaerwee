import axios from "axios";

export const TotalUser = async () => {
    const res = await axios.post("http://127.0.0.1:8080/count/users");
    return res.data;
}
export const TotalRoleUser = async () => {
    const res = await axios.post("http://127.0.0.1:8080/count/roleuser");
    return res.data;
}
export const TotalRoleAdmin = async () => {
    const res = await axios.post("http://127.0.0.1:8080/count/roleadmin");
    return res.data;
}
export const TotalLanguage = async () => {
    const res = await axios.post("http://127.0.0.1:8080/count/language");
    return res.data;
}
export const TotalActiveLang = async () => {
    const res = await axios.post("http://127.0.0.1:8080/count/activelang");
    return res.data;
}
export const TotalInactiveLang = async () => {
    const res = await axios.post("http://127.0.0.1:8080/count/inactiveLang");
    return res.data;
}
export const TotalHistory = async () => {
    const res = await axios.post("http://127.0.0.1:8080/count/history");
    return res.data;
}
export const SubmitLabels = async (label) => {
  const res = await axios.post(
    "http://127.0.0.1:8080/monitoring/languages",
    { label: label }
  );

  return res.data;
};
