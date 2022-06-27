// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer.Users;

namespace Authorization
{
    public class Config
    {
        private readonly IUserRepository _userRepository;

        public Config(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public static IEnumerable<IdentityResource> Ids =>
           new IdentityResource[]
           {
                new IdentityResources.OpenId(),
                new IdentityResource(
                    name: "customProfile",
                    displayName: "Custom Profile",
                    claimTypes: new[] { JwtClaimTypes.Name })
           };

        public static IEnumerable<ApiResource> Apis =>
            new ApiResource[]
            {
                new ApiResource("Store", "Store", new [] {JwtClaimTypes.Name }),
                new ApiResource("Basket", "Basket", new [] {JwtClaimTypes.Name })
            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                new Client
                {
                     ClientId = "AngularClient",
                     ClientName = "Angular Client",
                     RequireConsent = false,
                     AllowedGrantTypes = GrantTypes.Implicit,
                     RedirectUris = { "http://localhost:4200/home/" },
                     PostLogoutRedirectUris = { "http://localhost:4200/" },
                     AllowedCorsOrigins = { "http://localhost:4200" },
                     AllowAccessTokensViaBrowser = true,
                     AccessTokenLifetime = 3600,
                     AllowedScopes = { "openid", "Store", "Basket", "customProfile" },
                     AlwaysIncludeUserClaimsInIdToken = true
                }
            };
    }
}