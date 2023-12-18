using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication6.DataAcces
{
    class SqlFunctions
    {


        SqlConnection con;
        SqlCommand cmd;
        SqlDataAdapter adp;
        DataTable dt;
        DataSet ds;
        public string conString { get; }

        public SqlFunctions()
        {
            conString = GetConfiguration();
        }

        public String GetConfiguration()
        {
            var configurationBuilder = new ConfigurationBuilder();
            string path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);
            var conStr1 = configurationBuilder.Build().GetSection("ConnectionStrings:DefaultConnection").Value.ToString();

            return conStr1;
        }


        //Function executes any Insert, Update and Delete operation and returns a message.
        public DataTable ExecuteNonQueryWithOutputMsg(string storedProcName, params SqlParameter[] arrParam)
        {

            con = new SqlConnection(conString);
            cmd = new SqlCommand(storedProcName, con);
            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                if (con.State == ConnectionState.Closed || con.State == ConnectionState.Broken)
                    con.Open();
                if (arrParam != null)
                {
                    foreach (SqlParameter param in arrParam)
                        cmd.Parameters.Add(param);
                }
                cmd.ExecuteNonQuery();


                string Rcode = cmd.Parameters["@Rcode"].Value.ToString();
                string Rmessage = cmd.Parameters["@Rmessage"].Value.ToString();
                string LoginType = cmd.Parameters["@Lg_Type"].Value.ToString();
                string LoginId = cmd.Parameters["@LoginId"].Value.ToString();
                string DisplayName = cmd.Parameters["@DisplayName"].Value.ToString();

                DataTable ddt = new DataTable();

                ddt.Columns.Add("Rcode");
                ddt.Columns.Add("Rmessage");
                ddt.Columns.Add("LoginType");
                ddt.Columns.Add("LoginId");
                ddt.Columns.Add("DisplayName");

                ddt.Rows.Add(Rcode, Rmessage, LoginType, LoginId, DisplayName);


                return ddt;
            }
            catch (SqlException sx)
            {
                throw sx;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                cmd.Dispose();
                if (con.State == ConnectionState.Open)
                    con.Close();
            }
        }



        // Function executes the given procedure and returns DataTable filled with data.
        public dynamic ReturnDtWithProc(string storedProcName, params SqlParameter[] arrParam)
        {
            try
            {


                dt = new DataTable();
                con = new SqlConnection(conString);
                cmd = new SqlCommand(storedProcName, con);
                SqlDataAdapter adap = new SqlDataAdapter();
                cmd.CommandType = CommandType.StoredProcedure;
                if (con.State == ConnectionState.Closed || con.State == ConnectionState.Broken)
                    con.Open();
                if (arrParam != null)
                {
                    foreach (SqlParameter param in arrParam)
                        cmd.Parameters.Add(param);
                }
                adap.SelectCommand = cmd;
                adap.Fill(dt);
                return dt;
            }
            catch (SqlException sx)
            {
                throw sx;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                cmd.Dispose();
                if (con.State == ConnectionState.Open)
                    con.Close();
            }
        }


        //Function executes any Insert, Update and Delete operation and returns the row affected.
        public int ExecuteNonQueryWithProc(string storedProcName, params SqlParameter[] arrParam)
        {

            con = new SqlConnection(conString);
            cmd = new SqlCommand(storedProcName, con);
            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                if (con.State == ConnectionState.Closed || con.State == ConnectionState.Broken)
                    con.Open();
                if (arrParam != null)
                {
                    foreach (SqlParameter param in arrParam)
                        cmd.Parameters.Add(param);

                }
                return cmd.ExecuteNonQuery();
            }
            catch (SqlException sx)
            {
                throw sx;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                cmd.Dispose();
                if (con.State == ConnectionState.Open)
                    con.Close();
            }
        }
    }
}
