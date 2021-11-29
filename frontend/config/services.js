const filesystemService = {
  host: "http://filesystem",
  port: 8000,
  url: "",
}
filesystemService.url = `${filesystemService.host}:${filesystemService.port}`

const servicesConfig = {
  filesystem: filesystemService,
}

export default servicesConfig
