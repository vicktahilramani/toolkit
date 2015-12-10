##Use this to test connections and firewalls to an SQL database when no sql client is installed on a computer.

$conn = New-Object System.Data.SqlClient.SqlConnection
$conn.ConnectionString = "Server=tcp:cidatabaseserver.database.windows.net,1433;Database=******;User ID=*****;Password=*****);Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
$conn.open()
$cmd = New-Object System.Data.SqlClient.SqlCommand
$cmd.connection = $conn
$cmd.commandtext = "select * from sys.databases"
$SqlAdapter = New-Object System.Data.SqlClient.SqlDataAdapter

$SqlAdapter.SelectCommand = $cmd

$DataSet = New-Object System.Data.DataSet

$SqlAdapter.Fill($DataSet)

foreach ($row in $DataSet.Tables[0].Rows){

write-Host ($row[1].ToString().Trim())

write-Host  ($row[2].ToString())

Write-Host  ($row[3].ToString().Trim())

}

$conn.Close()