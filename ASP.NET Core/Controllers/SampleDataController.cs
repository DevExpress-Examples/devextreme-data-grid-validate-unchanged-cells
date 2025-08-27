using ASP_NET_Core.Models;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;

namespace ASP_NET_Core.Controllers {

    [Route("api/[controller]")]
    public class SampleDataController : Controller {

        [HttpGet]
        public object Get(DataSourceLoadOptions loadOptions)
        {
            return DataSourceLoader.Load(SampleData.Customers, loadOptions);
        }

        [HttpPut]
        public IActionResult Put(int key, string values)
        {

            var customer = SampleData.Customers.First(e => e.ID == key);

            PopulateModel(customer, JsonSerializer.Deserialize<IDictionary>(values));

            if (!TryValidateModel(customer))
                return BadRequest(ModelState);

            return Ok(customer);
        }


        void PopulateModel(Customer customer, IDictionary values)
        {
            if (values.Contains("ID"))
                customer.ID = Convert.ToInt32(values["ID"]);

            if (values.Contains("CompanyName"))
                customer.CompanyName = Convert.ToString(values["CompanyName"]);

            if (values.Contains("Address"))
                customer.Address = Convert.ToString(values["Address"]);

            if (values.Contains("City"))
                customer.City = Convert.ToString(values["City"]);

            if (values.Contains("State"))
                customer.State = Convert.ToString(values["State"]);

            if (values.Contains("Zipcode"))
                customer.Zipcode = Convert.ToInt32(values["Zipcode"]);

            if (values.Contains("Phone"))
                customer.Phone = Convert.ToString(values["Phone"]);

            if (values.Contains("Fax"))
                customer.Fax = Convert.ToString(values["Fax"]);

            if (values.Contains("Website"))
                customer.Website = Convert.ToString(values["Website"]);
        }

    }
}